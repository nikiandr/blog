#!/usr/bin/env node
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const DEFAULT_CLOUDINARY_CLOUD_NAME = "dti4hpv7w";
const DEFAULT_MAX_LONG_EDGE = 1920;
const DEFAULT_JPEG_QUALITY = 85;
const EXTENSION_REGEX = /\.[^.]+$/;
const IMAGE_EXTENSION_REGEX = /\.(jpe?g|png|webp|tiff?)$/i;
const REQUIRED_OPTIONS = [
  "title",
  "description",
  "pubDate",
  "tripStart",
  "tripEnd",
];
const CLI_OPTION_MAP = {
  "input-dir": "inputDir",
  title: "title",
  slug: "albumSlug",
  description: "description",
  "pub-date": "pubDate",
  "trip-start": "tripStart",
  "trip-end": "tripEnd",
  cover: "coverPhoto",
  captions: "captionsPath",
  "cloudinary-cloud-name": "cloudinaryCloudName",
  "cloudinary-folder": "cloudinaryFolder",
  "cloudinary-upload-preset": "cloudinaryUploadPreset",
};
const NUMERIC_CLI_OPTION_MAP = {
  "max-long-edge": "maxLongEdge",
  quality: "quality",
};

export function slugifyAlbumTitle(title) {
  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export async function downsampleImage(
  sourcePath,
  outputPath,
  { maxLongEdge = DEFAULT_MAX_LONG_EDGE, quality = DEFAULT_JPEG_QUALITY } = {}
) {
  await mkdir(path.dirname(outputPath), { recursive: true });

  const result = await sharp(sourcePath, { failOn: "none" })
    .rotate()
    .resize({
      width: maxLongEdge,
      height: maxLongEdge,
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({ quality, mozjpeg: true })
    .toFile(outputPath);

  return {
    width: result.width,
    height: result.height,
    bytes: result.size,
    path: outputPath,
  };
}

export function buildAlbumJson({
  title,
  description,
  pubDate,
  draft = false,
  tripDates,
  coverPhoto,
  photos,
}) {
  if (!(Array.isArray(tripDates) && tripDates.length === 2)) {
    throw new Error("tripDates must contain exactly two YYYY-MM-DD dates");
  }

  return {
    title,
    description,
    pubDate,
    draft,
    tripDates,
    coverPhoto,
    photos: photos.map(
      ({ filename, cloudinaryUrl, description: photoDescription }) => ({
        photo: filename,
        url: cloudinaryUrl,
        description: photoDescription ?? "",
      })
    ),
  };
}

export async function uploadToCloudinary(
  sourcePath,
  {
    cloudName = process.env.CLOUDINARY_CLOUD_NAME ||
      DEFAULT_CLOUDINARY_CLOUD_NAME,
    uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET,
    apiKey = process.env.CLOUDINARY_API_KEY,
    apiSecret = process.env.CLOUDINARY_API_SECRET,
    folder,
    publicId,
  } = {}
) {
  if (uploadPreset) {
    const fileBuffer = await readFile(sourcePath);
    const form = new FormData();
    form.set("file", new Blob([fileBuffer]), path.basename(sourcePath));
    form.set("upload_preset", uploadPreset);
    if (folder) {
      form.set("folder", folder);
    }
    if (publicId) {
      form.set("public_id", publicId);
    }

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: form,
      }
    );

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(
        `Cloudinary unsigned upload failed (${response.status}): ${JSON.stringify(payload)}`
      );
    }

    return payload;
  }

  if (!(apiKey && apiSecret)) {
    throw new Error(
      "Missing Cloudinary upload configuration: set CLOUDINARY_UPLOAD_PRESET for unsigned uploads, or CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET for signed uploads"
    );
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const params = { timestamp };
  if (folder) {
    params.folder = folder;
  }
  if (publicId) {
    params.public_id = publicId;
  }

  const signaturePayload = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const signature = createHash("sha1")
    .update(`${signaturePayload}${apiSecret}`)
    .digest("hex");

  const fileBuffer = await readFile(sourcePath);
  const form = new FormData();
  form.set("file", new Blob([fileBuffer]), path.basename(sourcePath));
  form.set("api_key", apiKey);
  form.set("timestamp", timestamp);
  form.set("signature", signature);
  if (folder) {
    form.set("folder", folder);
  }
  if (publicId) {
    form.set("public_id", publicId);
  }

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: form,
    }
  );

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(
      `Cloudinary upload failed (${response.status}): ${JSON.stringify(payload)}`
    );
  }

  return payload;
}

export async function importPhotoAlbum({
  inputFiles,
  albumSlug,
  title,
  description,
  pubDate,
  tripDates,
  coverPhoto,
  captions = {},
  outputRoot = "src/albums",
  cloudinaryFolder,
  cloudinaryCloudName,
  cloudinaryUploadPreset,
  maxLongEdge = DEFAULT_MAX_LONG_EDGE,
  quality = DEFAULT_JPEG_QUALITY,
  upload = uploadToCloudinary,
}) {
  if (!albumSlug) {
    albumSlug = slugifyAlbumTitle(title);
  }
  if (!albumSlug) {
    throw new Error(
      "albumSlug is required or title must slugify to a non-empty value"
    );
  }
  if (!Array.isArray(inputFiles) || inputFiles.length === 0) {
    throw new Error("inputFiles must contain at least one image");
  }

  const albumDir = path.join(outputRoot, albumSlug);
  await mkdir(albumDir, { recursive: true });

  const photos = [];
  const generated = [];
  for (const sourcePath of inputFiles) {
    const filename = path.basename(sourcePath).replace(EXTENSION_REGEX, ".jpg");
    const localPath = path.join(albumDir, filename);
    const publicId = path.basename(filename, ".jpg");
    const uploadResult = await upload(sourcePath, {
      cloudName: cloudinaryCloudName,
      uploadPreset: cloudinaryUploadPreset,
      folder: cloudinaryFolder || title,
      publicId,
    });
    const resizeResult = await downsampleImage(sourcePath, localPath, {
      maxLongEdge,
      quality,
    });
    generated.push(resizeResult);
    photos.push({
      filename,
      cloudinaryUrl: uploadResult.secure_url,
      description:
        captions[path.basename(sourcePath)] ?? captions[filename] ?? "",
    });
  }

  const finalCoverPhoto = coverPhoto || photos[0].filename;
  const albumJson = buildAlbumJson({
    title,
    description,
    pubDate,
    draft: false,
    tripDates,
    coverPhoto: finalCoverPhoto,
    photos,
  });
  const albumJsonPath = path.join(albumDir, "album.json");
  await writeFile(albumJsonPath, `${JSON.stringify(albumJson, null, 2)}\n`);

  return {
    albumSlug,
    albumDir,
    albumJsonPath,
    albumJson,
    generated,
  };
}

function readOptionValue(argv, index, option) {
  const value = argv[index + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`Missing value for ${option}`);
  }
  return value;
}

function setCliOption(args, key, value) {
  if (key === "input") {
    args.inputFiles.push(value);
    return;
  }
  if (Object.hasOwn(CLI_OPTION_MAP, key)) {
    args[CLI_OPTION_MAP[key]] = value;
    return;
  }
  if (Object.hasOwn(NUMERIC_CLI_OPTION_MAP, key)) {
    args[NUMERIC_CLI_OPTION_MAP[key]] = Number(value);
    return;
  }
  throw new Error(`Unknown option: --${key}`);
}

function parseArgs(argv) {
  const args = { inputFiles: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--") {
      continue;
    }
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      if (key === "help") {
        args.help = true;
        continue;
      }
      setCliOption(args, key, readOptionValue(argv, i, arg));
      i += 1;
      continue;
    }
    args.inputFiles.push(arg);
  }
  return args;
}

async function listInputDir(inputDir) {
  const { readdir } = await import("node:fs/promises");
  const files = await readdir(inputDir);
  return files
    .filter((file) => IMAGE_EXTENSION_REGEX.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => path.join(inputDir, file));
}

function printHelp() {
  console.log(`Usage:
  node scripts/photo-import.mjs --input-dir /path/to/originals \\
    --title "Tallinn Winter Walk" \\
    --description "A quick walk through Tallinn in winter." \\
    --pub-date 2026-01-10 --trip-start 2026-01-09 --trip-end 2026-01-10

Options:
  --input FILE          Add one original image. Can be repeated.
  --input-dir DIR      Import all jpg/png/webp/tiff images from a directory.
  --title TEXT         Album title. Required.
  --slug SLUG          Album slug/directory. Defaults to slugified title.
  --description TEXT   Album description. Required.
  --pub-date DATE      Album publication date, YYYY-MM-DD. Required.
  --trip-start DATE    Trip start date, YYYY-MM-DD. Required.
  --trip-end DATE      Trip end date, YYYY-MM-DD. Required.
  --cover FILE         Local cover filename. Defaults to first imported image.
  --captions JSON      JSON file mapping source filename -> description.
  --cloudinary-cloud-name NAME
                       Defaults to CLOUDINARY_CLOUD_NAME or dti4hpv7w.
  --cloudinary-upload-preset PRESET
                       Use Cloudinary unsigned uploads. Defaults to CLOUDINARY_UPLOAD_PRESET.
  --cloudinary-folder FOLDER
                       Cloudinary Media Library folder. Defaults to album title.
  --max-long-edge N    Downsample long edge. Defaults to 1920.
  --quality N          JPEG quality. Defaults to 85.
`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  if (args.inputDir) {
    args.inputFiles.push(...(await listInputDir(args.inputDir)));
  }

  for (const key of REQUIRED_OPTIONS) {
    if (!args[key]) {
      throw new Error(
        `Missing required option --${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`
      );
    }
  }

  const captions = args.captionsPath
    ? JSON.parse(await readFile(args.captionsPath, "utf8"))
    : {};

  const result = await importPhotoAlbum({
    inputFiles: args.inputFiles,
    albumSlug: args.albumSlug,
    title: args.title,
    description: args.description,
    pubDate: args.pubDate,
    tripDates: [args.tripStart, args.tripEnd],
    coverPhoto: args.coverPhoto,
    captions,
    cloudinaryCloudName: args.cloudinaryCloudName,
    cloudinaryFolder: args.cloudinaryFolder,
    cloudinaryUploadPreset: args.cloudinaryUploadPreset,
    maxLongEdge: args.maxLongEdge || DEFAULT_MAX_LONG_EDGE,
    quality: args.quality || DEFAULT_JPEG_QUALITY,
  });

  console.log(`Created ${result.albumJsonPath}`);
  console.log(
    `Imported ${result.albumJson.photos.length} photos into ${result.albumDir}`
  );
}

const isCli =
  process.argv[1] &&
  fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isCli) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
