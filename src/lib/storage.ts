import crypto from "crypto";
import fs from "fs/promises";
import path from "path";
import { put } from "@vercel/blob";

export function ensureSafeFileName(fileName: string) {
  const normalized = fileName.replaceAll("\\", "_").replaceAll("/", "_").trim();
  return normalized.length ? normalized : "arquivo";
}

export function getStorageRoot() {
  return path.join(process.cwd(), "storage");
}

export async function saveUploadedFile({
  folder,
  file,
  maxBytes,
}: {
  folder: string;
  file: File;
  maxBytes: number;
}) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  if (buffer.byteLength > maxBytes) {
    throw new Error("Arquivo excede o tamanho permitido.");
  }

  const originalName = ensureSafeFileName(file.name || "arquivo");
  const ext = path.extname(originalName).slice(0, 10);
  const id = crypto.randomUUID();

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    if (buffer.byteLength > 4_500_000) {
      throw new Error("Na Vercel, uploads pelo servidor são limitados a 4.5 MB.");
    }
    const blob = await put(`${folder}/${id}${ext}`, buffer, {
      access: "public",
      contentType: file.type || undefined,
    });

    return {
      id,
      storagePath: blob.url,
      originalName,
      sizeBytes: buffer.byteLength,
      mimeType: file.type || undefined,
    };
  }

  const dir = path.join(getStorageRoot(), folder);
  await fs.mkdir(dir, { recursive: true });

  const fileName = `${id}${ext}`;
  const storagePath = path.join(dir, fileName);
  await fs.writeFile(storagePath, buffer);

  return {
    id,
    storagePath,
    originalName,
    sizeBytes: buffer.byteLength,
    mimeType: file.type || undefined,
  };
}
