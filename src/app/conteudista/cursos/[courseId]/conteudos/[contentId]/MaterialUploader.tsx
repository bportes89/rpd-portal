"use client";

import { useState } from "react";

export function MaterialUploader({
  contentId,
  onUploaded,
}: {
  contentId: string;
  onUploaded?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");

  return (
    <div className="stack">
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
              formData.set("kind", "MATERIAL");
              formData.set("contentId", contentId);
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

              setLoading(false);
              onUploaded?.();
              window.location.reload();
            }}
          />
        </label>
      </div>
      <p className="muted-2" style={{ fontSize: 12 }}>
        Materiais até 10MB.
      </p>
    </div>
  );
}
