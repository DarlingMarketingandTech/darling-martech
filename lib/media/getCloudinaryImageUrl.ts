type CropMode = "fill" | "fit" | "limit" | "pad" | "scale";

type CloudinaryImageOptions = {
  publicId: string;
  width?: number;
  height?: number;
  crop?: CropMode;
  quality?: "auto" | number;
  format?: "auto" | "webp" | "avif" | "jpg" | "png";
};

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export function getCloudinaryImageUrl({
  publicId,
  width,
  height,
  crop = "fill",
  quality = "auto",
  format = "auto",
}: CloudinaryImageOptions): string {
  if (!CLOUD_NAME) {
    throw new Error("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set");
  }

  const transforms: string[] = [];

  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (width || height) transforms.push(`c_${crop}`);

  if (quality === "auto") {
    transforms.push("q_auto");
  } else {
    transforms.push(`q_${quality}`);
  }

  if (format === "auto") {
    transforms.push("f_auto");
  } else {
    transforms.push(`f_${format}`);
  }

  const transformationSegment = transforms.join(",");

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformationSegment}/${publicId}`;
}
