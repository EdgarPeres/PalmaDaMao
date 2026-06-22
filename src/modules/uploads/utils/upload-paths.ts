import path from "node:path";

export function getUploadRoot(): string {
  return path.resolve(/*turbopackIgnore: true*/ process.cwd(), "uploads");
}

export function getUploadPublicUrl(relativePath: string): string {
  return `/uploads/${relativePath.replaceAll(path.sep, "/")}`;
}

export function resolveUploadPath(relativePath: string): string {
  const uploadRoot = getUploadRoot();
  const resolvedPath = path.resolve(uploadRoot, relativePath);
  const relativeFromRoot = path.relative(uploadRoot, resolvedPath);

  if (relativeFromRoot.startsWith("..") || path.isAbsolute(relativeFromRoot)) {
    throw new Error("Invalid upload path.");
  }

  return resolvedPath;
}
