import images from "../constants/images";

// The product API sometimes returns a folder path glued onto a URL that is
// already absolute, for example:
// http://panel.../product_img/https://panel.../product_img/file.png
const DOUBLED_PRODUCT_IMAGE = /product_img\/(https?:\/\/\S+)/i;

export const resolveProductImageSrc = (product) => {
  const raw = product?.product_img?.[0]?.img_video;
  if (typeof raw !== "string" || !raw.trim()) return images.bottel_img;

  const src = raw.trim();
  const doubled = src.match(DOUBLED_PRODUCT_IMAGE);
  if (doubled) return doubled[1];
  if (/^https?:\/\//i.test(src)) return src;

  return images.bottel_img;
};

export const handleProductImageError = (event) => {
  const img = event.currentTarget;
  if (img.dataset.fallbackApplied === "1") return;
  img.dataset.fallbackApplied = "1";
  img.src = images.bottel_img;
};
