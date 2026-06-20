import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { ALLOWED_IMAGE_TYPES, MAX_UPLOAD_SIZE_BYTES } from "@/modules/uploads/constants";
import { getUploadPublicUrl, getUploadRoot, resolveUploadPath } from "@/modules/uploads/utils/upload-paths";

const extensionByMimeType: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png"
};

export type UploadImageResult = {
  url: string;
  path: string;
};

export async function uploadImage(file: File, folder = "images"): Promise<UploadImageResult> {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type as never)) {
    throw new Error("INVALID_TYPE");
  }

  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    throw new Error("FILE_TOO_LARGE");
  }

  const safeFolder = folder.replace(/[^a-z0-9-]/gi, "").toLowerCase() || "images";
  const extension = extensionByMimeType[file.type];
  const fileName = `${crypto.randomUUID()}.${extension}`;
  const relativePath = path.join(safeFolder, fileName);
  const absolutePath = resolveUploadPath(relativePath);
  const buffer = Buffer.from(await file.arrayBuffer());

  await mkdir(path.dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, buffer);

  return {
    url: getUploadPublicUrl(relativePath),
    path: relativePath
  };
}

export async function deleteImage(relativePathOrUrl: string): Promise<void> {
  const relativePath = relativePathOrUrl.replace(/^\/uploads\//, "");
  const absolutePath = resolveUploadPath(relativePath);

  await unlink(absolutePath).catch(() => undefined);
}

export async function readUploadedFile(relativePath: string): Promise<Buffer> {
  return readFile(resolveUploadPath(relativePath));
}

export function getUploadContentType(relativePath: string): string {
  if (relativePath.endsWith(".png")) {
    return "image/png";
  }

  return "image/jpeg";
}

export async function ensureUploadRoot(): Promise<void> {
  await mkdir(getUploadRoot(), { recursive: true });
}
