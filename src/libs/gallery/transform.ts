import type { ImageMetadata } from "astro";
import { getImage } from "astro:assets";
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

/**
 * Transform image metadata to gallery image format with optimized versions
 * Preserves original aspect ratios
 */
export const transformImageToGalleryImage = async (
  imageMetadata: ImageMetadata,
  alt = ""
): Promise<GalleryImage> => {
  // Generate lightbox image (preserve aspect ratio, max width)
  const lightboxImage = await getImage({
    src: imageMetadata,
    width: lightboxMaxWidth,
    ...defaultAstroImageOptions,
  });

  // Generate thumbnail image (responsive, preserve aspect ratio)
  const thumbnailImage = await getImage({
    src: imageMetadata,
    widths: thumbnailWidths,
    ...defaultAstroImageOptions,
  });

  return {
    thumbnail: {
      src: thumbnailImage.src,
      srcset: thumbnailImage.srcSet.attribute,
      sizes:
        "(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 400px",
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

