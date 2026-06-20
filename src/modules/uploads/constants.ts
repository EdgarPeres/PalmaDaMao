export const MAX_UPLOAD_SIZE_BYTES = 5 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png"] as const;

export type AllowedImageType = (typeof ALLOWED_IMAGE_TYPES)[number];
