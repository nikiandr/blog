export type GalleryImage = {
  thumbnail: {
    src: string;
    srcset: string;
    sizes: string;
    width: number;
    height: number;
  };
  lightbox: {
    src: string;
    width: number;
    height: number;
  };
  alt: string;
};
