import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import { useEffect } from "react";
import { GALLERY } from "../../constants/gallery";
import type { GalleryImage } from "../../types/gallery";

type GalleryProps = {
  images: GalleryImage[];
  className?: string;
};

export const Gallery = ({ images, className = "" }: GalleryProps) => {
  // Initialize PhotoSwipe lightbox
  useEffect(() => {
    let lightbox: PhotoSwipeLightbox | null = new PhotoSwipeLightbox({
      gallery: `#${GALLERY.ID}`,
      children: "a",
      pswpModule: () => import("photoswipe"),
      padding: { top: 40, bottom: 40, left: 20, right: 20 },
      bgOpacity: 0.9,
    });

    lightbox.init();

    return () => {
      lightbox?.destroy();
      lightbox = null;
    };
  }, []);

  const getGridClass = (aspectRatio: number): string => {
    // Portrait images (taller than wide)
    if (aspectRatio < 0.75) {
      return "row-span-2";
    }
    // Landscape images (wider than tall)
    if (aspectRatio > 1.5) {
      return "col-span-2";
    }
    // Square-ish images
    return "";
  };

  return (
    <div className={className}>
      {/* Gallery Grid - Dense layout to eliminate gaps */}
      <div
        className="grid grid-flow-dense auto-rows-[200px] grid-cols-2 gap-2 sm:auto-rows-[250px] sm:grid-cols-3 lg:auto-rows-[280px] lg:grid-cols-4"
        id={GALLERY.ID}
      >
        {images.map((image, index) => {
          const aspectRatio = image.thumbnail.width / image.thumbnail.height;
          const gridClass = getGridClass(aspectRatio);

          return (
            <a
              className={`group relative block overflow-hidden rounded-lg bg-platinum/20 dark:bg-dark_slate-400 ${gridClass}`}
              data-pswp-height={image.lightbox.height}
              data-pswp-width={image.lightbox.width}
              href={image.lightbox.src}
              key={`${GALLERY.ID}--${image.lightbox.src}--${index}`}
              rel="noreferrer"
              target="_blank"
            >
              <img
                alt={image.alt}
                className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                height={image.thumbnail.height}
                loading="lazy"
                sizes={image.thumbnail.sizes}
                src={image.thumbnail.src}
                srcSet={image.thumbnail.srcset}
                style={{
                  opacity: 0,
                  animation: "fadeIn 0.4s ease-in forwards",
                }}
                width={image.thumbnail.width}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-payne_gray/0 transition-colors duration-300 group-hover:bg-payne_gray/10 dark:group-hover:bg-silver_gray/10" />
            </a>
          );
        })}
      </div>

      {/* Empty state */}
      {images.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-davy_gray text-lg dark:text-silver_gray-500">
            No photos in this album yet.
          </p>
        </div>
      )}

      {/* Add fadeIn animation via style tag */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
