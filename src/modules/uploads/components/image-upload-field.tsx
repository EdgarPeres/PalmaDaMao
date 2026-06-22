"use client";

import { Upload } from "lucide-react";
import { useState } from "react";

type ImageUploadFieldProps = {
  defaultValue: string;
  folder: string;
  label: string;
  name: string;
};

type UploadResponse = {
  ok: boolean;
  upload?: {
    url: string;
  };
  error?: string;
};

export function ImageUploadField({
  defaultValue,
  folder,
  label,
  name
}: ImageUploadFieldProps): React.ReactElement {
  const [value, setValue] = useState(defaultValue);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    const file = event.target.files?.[0];

    if (!file) {
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

      setValue(data.upload.url);
      setMessage("Imagem enviada.");
    } catch {
      setMessage("Nao foi possivel enviar a imagem.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          className="h-11 flex-1 rounded-md border border-slate-300 px-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
          name={name}
          onChange={(event) => setValue(event.target.value)}
          placeholder="/uploads/imagem.png"
          value={value}
        />
        <label className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md bg-slate-100 px-4 text-sm font-semibold text-slate-900 hover:bg-slate-200">
          <Upload aria-hidden="true" className="h-4 w-4" />
          {isUploading ? "Enviando..." : "Upload"}
          <input accept="image/png,image/jpeg" className="hidden" onChange={handleFileChange} type="file" />
        </label>
      </div>
      {message ? <p className="text-sm text-slate-600">{message}</p> : null}
    </div>
  );
}
