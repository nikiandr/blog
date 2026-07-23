import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import sharp from "sharp";

import {
  buildAlbumJson,
  downsampleImage,
  importPhotoAlbum,
  slugifyAlbumTitle,
  uploadToCloudinary,
} from "./photo-import.mjs";

test("slugifyAlbumTitle creates filesystem-safe album slugs", () => {
  assert.equal(
    slugifyAlbumTitle("Tallinn Winter Walk!"),
    "tallinn-winter-walk"
  );
  assert.equal(
    slugifyAlbumTitle("  Oslo  / November 2025  "),
    "oslo-november-2025"
  );
});

test("downsampleImage limits the long edge to 1920px and writes jpeg", async () => {
  const dir = await mkdtemp(path.join(os.tmpdir(), "photo-import-test-"));
  try {
    const source = path.join(dir, "source.jpg");
    const output = path.join(dir, "output.jpg");

    await sharp({
      create: {
        width: 4000,
        height: 3000,
        channels: 3,
        background: "#88aadd",
      },
    })
      .jpeg({ quality: 95 })
      .toFile(source);

    const result = await downsampleImage(source, output, {
      maxLongEdge: 1920,
      quality: 85,
    });
    const metadata = await sharp(output).metadata();

    assert.equal(metadata.format, "jpeg");
    assert.equal(Math.max(metadata.width, metadata.height), 1920);
    assert.deepEqual(
      { width: metadata.width, height: metadata.height },
      { width: 1920, height: 1440 }
    );
    assert.equal(result.width, 1920);
    assert.equal(result.height, 1440);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("buildAlbumJson writes existing repo photo filename plus Cloudinary original URL", () => {
  const album = buildAlbumJson({
    title: "Tallinn Winter Walk",
    description: "A quick walk through Tallinn in winter.",
    pubDate: "2026-01-10",
    tripDates: ["2026-01-09", "2026-01-10"],
    coverPhoto: "IMG_0001.jpg",
    photos: [
      {
        filename: "IMG_0001.jpg",
        cloudinaryUrl:
          "https://res.cloudinary.com/dti4hpv7w/image/upload/v1/IMG_0001.jpg",
        description: "Snowy street near the old town",
      },
    ],
  });

  assert.deepEqual(album, {
    title: "Tallinn Winter Walk",
    description: "A quick walk through Tallinn in winter.",
    pubDate: "2026-01-10",
    draft: false,
    tripDates: ["2026-01-09", "2026-01-10"],
    coverPhoto: "IMG_0001.jpg",
    photos: [
      {
        photo: "IMG_0001.jpg",
        url: "https://res.cloudinary.com/dti4hpv7w/image/upload/v1/IMG_0001.jpg",
        description: "Snowy street near the old town",
      },
    ],
  });
});

test("uploadToCloudinary supports Nikita's unsigned upload preset", async () => {
  const dir = await mkdtemp(
    path.join(os.tmpdir(), "photo-import-upload-test-")
  );
  const originalFetch = globalThis.fetch;
  try {
    const source = path.join(dir, "IMG_0001.jpg");
    await writeFile(source, Buffer.from([0xff, 0xd8, 0xff, 0xd9]));

    let capturedUrl = "";
    let capturedForm;
    globalThis.fetch = (url, { body }) => {
      capturedUrl = url;
      capturedForm = body;
      return new Response(
        JSON.stringify({
          secure_url:
            "https://res.cloudinary.com/dti4hpv7w/image/upload/v1/Tallinn%20Winter%20Walk/IMG_0001.jpg",
        }),
        { headers: { "content-type": "application/json" }, status: 200 }
      );
    };

    const result = await uploadToCloudinary(source, {
      cloudName: "dti4hpv7w",
      uploadPreset: "blog_hermes_unsigned",
      folder: "Tallinn Winter Walk",
      publicId: "IMG_0001",
    });

    assert.equal(
      capturedUrl,
      "https://api.cloudinary.com/v1_1/dti4hpv7w/image/upload"
    );
    assert.equal(capturedForm.get("upload_preset"), "blog_hermes_unsigned");
    assert.equal(capturedForm.get("folder"), "Tallinn Winter Walk");
    assert.equal(capturedForm.get("public_id"), "IMG_0001");
    assert.equal(
      result.secure_url,
      "https://res.cloudinary.com/dti4hpv7w/image/upload/v1/Tallinn%20Winter%20Walk/IMG_0001.jpg"
    );
  } finally {
    globalThis.fetch = originalFetch;
    await rm(dir, { recursive: true, force: true });
  }
});

test("importPhotoAlbum uploads originals, writes Full HD local copies, and creates album.json", async () => {
  const dir = await mkdtemp(path.join(os.tmpdir(), "photo-import-album-test-"));
  try {
    const originals = path.join(dir, "originals");
    const outputRoot = path.join(dir, "albums");
    await mkdir(originals, { recursive: true });
    const source = path.join(originals, "IMG_0001.png");
    await sharp({
      create: {
        width: 3000,
        height: 2000,
        channels: 3,
        background: "#bbccdd",
      },
    })
      .png()
      .toFile(source);

    const result = await importPhotoAlbum({
      inputFiles: [source],
      albumSlug: "tallinn-winter-walk",
      title: "Tallinn Winter Walk",
      description: "A quick walk through Tallinn in winter.",
      pubDate: "2026-01-10",
      tripDates: ["2026-01-09", "2026-01-10"],
      captions: { "IMG_0001.png": "Snowy street near the old town" },
      outputRoot,
      upload: async (_sourcePath, options) => ({
        secure_url: `https://res.cloudinary.com/dti4hpv7w/image/upload/${options.folder}/${options.publicId}.jpg`,
      }),
    });

    const localImage = path.join(
      outputRoot,
      "tallinn-winter-walk",
      "IMG_0001.jpg"
    );
    const metadata = await sharp(localImage).metadata();
    const albumJson = JSON.parse(await readFile(result.albumJsonPath, "utf8"));

    assert.equal(Math.max(metadata.width, metadata.height), 1920);
    assert.equal(albumJson.coverPhoto, "IMG_0001.jpg");
    assert.deepEqual(albumJson.photos, [
      {
        photo: "IMG_0001.jpg",
        url: "https://res.cloudinary.com/dti4hpv7w/image/upload/Tallinn Winter Walk/IMG_0001.jpg",
        description: "Snowy street near the old town",
      },
    ]);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
