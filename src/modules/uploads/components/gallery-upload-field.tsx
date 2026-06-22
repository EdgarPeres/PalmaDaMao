"use client";

import { Upload } from "lucide-react";
import { useMemo, useState } from "react";

type GalleryUploadFieldProps = {
  defaultValue: string;
  folder: string;
  label: string;
  maxItems?: number;
  name: string;
};

type UploadResponse = {
  ok: boolean;
  upload?: {
    url: string;
  };
  error?: string;
};

export function GalleryUploadField({
  defaultValue,
  folder,
  label,
  maxItems = 20,
  name
}: GalleryUploadFieldProps): React.ReactElement {
  const [value, setValue] = useState(defaultValue);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const imageCount = useMemo(() => getLines(value).length, [value]);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    if (imageCount >= maxItems) {
      setMessage(`Limite de ${maxItems} imagens atingido.`);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    setIsUploading(true);
    setMessage("");

    try {
      const response = await fetch("/api/uploads", {
        method: "POST",
        body: formData
      });
      const data = (await response.json()) as UploadResponse;

      if (!response.ok || !data.upload) {
        setMessage(data.error ?? "Nao foi possivel enviar a imagem.");
        return;
      }

      setValue((currentValue) => [...getLines(currentValue), data.upload!.url].join("\n"));
      setMessage("Imagem adicionada a galeria.");
    } catch {
      setMessage("Nao foi possivel enviar a imagem.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="block text-sm font-medium" htmlFor={name}>
          {label}
        </label>
        <span className="text-xs font-medium text-slate-500">
          {imageCount}/{maxItems} imagens
        </span>
      </div>
      <textarea
        className="min-h-32 w-full rounded-md border border-slate-300 px-3 py-2 font-mono text-sm outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
        id={name}
        name={name}
        onChange={(event) => setValue(event.target.value)}
        placeholder={"Uma imagem por linha, ate 20 imagens.\n/uploads/empresa/foto-1.png\nhttps://exemplo.com/foto.jpg"}
        value={value}
      />
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <label className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md bg-slate-100 px-4 text-sm font-semibold text-slate-900 hover:bg-slate-200">
          <Upload aria-hidden="true" className="h-4 w-4" />
          {isUploading ? "Enviando..." : "Adicionar imagem"}
          <input
            accept="image/png,image/jpeg"
            className="hidden"
            disabled={isUploading || imageCount >= maxItems}
            onChange={handleFileChange}
            type="file"
          />
        </label>
        {message ? <p className="text-sm text-slate-600">{message}</p> : null}
      </div>
    </div>
  );
}

function getLines(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}
