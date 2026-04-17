"use client";

import Image from "next/image";
import { useState } from "react";

export function PhotoUploader({ initialUrl }: { initialUrl?: string | null }) {
  const [url, setUrl] = useState<string | null>(initialUrl ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");

  return (
    <div className="stack">
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 18,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.06)",
            flex: "0 0 auto",
          }}
        >
          {url ? (
            <Image
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              height={64}
              src={url}
              width={64}
              unoptimized
            />
          ) : null}
        </div>

        <div className="file-meta">
          <p className="section-title" style={{ fontSize: 14 }}>
            Foto do perfil
          </p>
          <p className="muted-2" style={{ fontSize: 12 }}>
            PNG/JPG até 5MB.
          </p>
        </div>
      </div>

      {error ? (
        <div className="alert alert--danger">{error}</div>
      ) : null}

      <div className="file-row">
        <div className="file-name" title={fileName}>
          {fileName ? fileName : "Nenhum arquivo selecionado"}
        </div>
        <label className="btn btn-ghost btn-sm">
          {loading ? "Enviando..." : "Selecionar arquivo"}
          <input
            accept="image/*"
            className="file-input"
            disabled={loading}
            type="file"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setFileName(file.name);
              setError(null);
              setLoading(true);

              const formData = new FormData();
              formData.set("kind", "PROFILE_PHOTO");
              formData.set("file", file);

              const res = await fetch("/api/conteudista/upload", {
                method: "POST",
                body: formData,
              });

              const data = await res.json().catch(() => ({}));
              if (!res.ok) {
                setError(data?.error || "Falha ao enviar arquivo.");
                setLoading(false);
                return;
              }

              setUrl(String(data.url));
              setLoading(false);
            }}
          />
        </label>
      </div>
    </div>
  );
}
