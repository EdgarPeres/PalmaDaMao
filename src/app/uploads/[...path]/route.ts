import { notFound } from "next/navigation";
import { getUploadContentType, readUploadedFile } from "@/modules/uploads/services/upload.service";

type UploadRouteProps = {
  params: Promise<{
    path: string[];
  }>;
};

export async function GET(_request: Request, { params }: UploadRouteProps): Promise<Response> {
  const { path } = await params;
  const relativePath = path.join("/");

  try {
    const file = await readUploadedFile(relativePath);

    return new Response(new Uint8Array(file), {
      headers: {
        "Content-Type": getUploadContentType(relativePath),
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    });
  } catch {
    notFound();
  }
}
