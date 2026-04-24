"use client";
import { useState, useRef } from "react";
import { Copy, Check, Upload } from "lucide-react";

export function Base64() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const process = () => {
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
      setError("");
    } catch (e: unknown) { setError((e as Error).message); setOutput(""); }
  };

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setOutput(result.split(",")[1] ?? "");
      setMode("encode");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Mode + file */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
        {(["encode", "decode"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)} style={{ padding: "8px 20px", borderRadius: "8px", fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, border: `1px solid ${mode === m ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.1)"}`, background: mode === m ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.04)", color: mode === m ? "#818cf8" : "#94a3b8", cursor: "pointer", textTransform: "capitalize" }}>{m}</button>
        ))}
        <input type="file" ref={fileRef} onChange={handleFile} style={{ display: "none" }} />
        <button className="btn-ghost" onClick={() => fileRef.current?.click()} style={{ gap: "6px", fontSize: "13px", padding: "8px 16px" }}>
          <Upload size={14} /> Upload File
        </button>
        <button className="btn-primary" onClick={process} style={{ marginLeft: "auto" }}>
          {mode === "encode" ? "Encode" : "Decode"}
        </button>
      </div>

      <div className="glass-card-static" style={{ borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#94a3b8" }}>{mode === "encode" ? "Plain Text" : "Base64"}</span>
        </div>
        <textarea className="glass-input" value={input} onChange={(e) => setInput(e.target.value)} rows={8} placeholder={mode === "encode" ? "Enter text to encode…" : "Enter Base64 to decode…"} style={{ border: "none", borderRadius: 0 }} />
      </div>

      {error && <div style={{ background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.3)", borderRadius: "10px", padding: "10px 16px", fontFamily: "var(--font-mono)", fontSize: "13px", color: "#f43f5e" }}>✕ {error}</div>}

      {output && (
        <div className="glass-card-static" style={{ borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#94a3b8" }}>{mode === "encode" ? "Base64" : "Decoded Text"}</span>
            <button className="btn-icon" onClick={copy} style={{ color: copied ? "#10b981" : undefined }}>{copied ? <Check size={15} /> : <Copy size={15} />}</button>
          </div>
          <textarea className="glass-input" value={output} readOnly rows={8} style={{ border: "none", borderRadius: 0, wordBreak: "break-all" }} />
        </div>
      )}
    </div>
  );
}
