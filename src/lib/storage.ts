import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

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
