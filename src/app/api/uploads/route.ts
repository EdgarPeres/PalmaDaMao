import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth/options";
import { deleteImage, uploadImage } from "@/modules/uploads/services/upload.service";

export async function POST(request: Request): Promise<NextResponse> {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ ok: false, error: "Nao autorizado." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const folder = String(formData.get("folder") ?? "images");

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "Arquivo nao enviado." }, { status: 400 });
  }

  try {
    const upload = await uploadImage(file, folder);
    return NextResponse.json({ ok: true, upload });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Envie uma imagem JPG ou PNG com ate 5 MB." },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request): Promise<NextResponse> {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ ok: false, error: "Nao autorizado." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { path?: string; url?: string } | null;
  const target = body?.path ?? body?.url;

  if (!target) {
    return NextResponse.json({ ok: false, error: "Arquivo nao informado." }, { status: 400 });
  }

  await deleteImage(target);

  return NextResponse.json({ ok: true });
}
