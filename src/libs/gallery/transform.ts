import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";
import type { GalleryImage } from "../../types/gallery";

// Common image optimization options
const defaultAstroImageOptions = {
  format: "webp" as const,
  quality: 85,
};

// Thumbnail widths - preserve aspect ratio
const thumbnailWidths = [640, 768, 1024, 1280, 1536];

// Lightbox max width - preserve aspect ratio
const lightboxMaxWidth = 1920;

// Responsive sizes for gallery thumbnails
const thumbnailSizes =
  "(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 400px";

/**
 * Transform local image metadata to gallery image format with optimized versions
 */
export const transformLocalImageToGalleryImage = async (
  imageMetadata: ImageMetadata,
  alt = ""
): Promise<GalleryImage> => {
  const lightboxImage = await getImage({
    src: imageMetadata,
    width: lightboxMaxWidth,
    ...defaultAstroImageOptions,
  });

  const thumbnailImage = await getImage({
    src: imageMetadata,
    widths: thumbnailWidths,
    ...defaultAstroImageOptions,
  });

  return {
    thumbnail: {
      src: thumbnailImage.src,
      srcset: thumbnailImage.srcSet.attribute,
      sizes: thumbnailSizes,
      width: thumbnailImage.attributes.width ?? 0,
      height: thumbnailImage.attributes.height ?? 0,
    },
    lightbox: {
      src: lightboxImage.src,
      width: lightboxImage.attributes.width ?? 0,
      height: lightboxImage.attributes.height ?? 0,
    },
    alt,
  };
};

/**
 * Build Cloudinary URL with transformations
 */
const buildCloudinaryUrl = (
  baseUrl: string,
  transformations: string
): string => {
  // Cloudinary URL format: https://res.cloudinary.com/{cloud}/image/upload/{transformations}/{public_id}
  const uploadIndex = baseUrl.indexOf("/upload/");
  if (uploadIndex === -1) {
    return baseUrl;
  }

  const beforeUpload = baseUrl.slice(0, uploadIndex + 8);
  const afterUpload = baseUrl.slice(uploadIndex + 8);

  return `${beforeUpload}${transformations}/${afterUpload}`;
};

/**
 * Fetch image dimensions from Cloudinary using fl_getinfo
 */
export const fetchCloudinaryDimensions = async (
  url: string
): Promise<{ width: number; height: number }> => {
  const infoUrl = buildCloudinaryUrl(url, "fl_getinfo");
  const response = await fetch(infoUrl);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch Cloudinary image info: ${response.status}`
    );
  }

  const data = await response.json();
  return {
    width: data.input.width,
    height: data.input.height,
  };
};

/**
 * Transform Cloudinary URL to gallery image format with responsive versions
 */
export const transformCloudinaryToGalleryImage = (
  url: string,
  width: number,
  height: number,
  alt = ""
): GalleryImage => {
  const aspectRatio = height / width;

  // Generate srcset for thumbnails
  const srcset = thumbnailWidths
    .map((w) => {
      const h = Math.round(w * aspectRatio);
      const transformedUrl = buildCloudinaryUrl(
        url,
        `w_${w},h_${h},c_fill,q_auto,f_auto`
      );
      return `${transformedUrl} ${w}w`;
    })
    .join(", ");

  // Thumbnail uses smallest size
  const thumbWidth = thumbnailWidths[0];
  const thumbHeight = Math.round(thumbWidth * aspectRatio);
  const thumbnailUrl = buildCloudinaryUrl(
    url,
    `w_${thumbWidth},h_${thumbHeight},c_fill,q_auto,f_auto`
  );

  // Lightbox uses original dimensions (only optimize format/quality)
  const lightboxUrl = buildCloudinaryUrl(url, "q_auto,f_auto");

  return {
    thumbnail: {
      src: thumbnailUrl,
      srcset,
      sizes: thumbnailSizes,
      width: thumbWidth,
      height: thumbHeight,
    },
    lightbox: {
      src: lightboxUrl,
      width,
      height,
    },
    alt,
  };
};
