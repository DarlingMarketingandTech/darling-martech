export type CloudinaryImage = {
  public_id: string
  secure_url: string
  width: number
  height: number
  format: string
}

export type StudioSection = 'photography' | 'graphic-design' | 'proof'

export const cloudinaryLoader = ({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_${quality ?? 75},w_${width}/${src}`
}

export function buildCloudinaryUrl(publicId: string, transforms = 'f_auto,q_auto') {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms}/${publicId}`
}
