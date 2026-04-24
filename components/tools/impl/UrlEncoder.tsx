"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function UrlEncoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const process = () => {
    try {
      setOutput(mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input));
      setError("");
    } catch (e: unknown) { setError((e as Error).message); setOutput(""); }
  };

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
        {(["encode", "decode"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)} style={{ padding: "8px 20px", borderRadius: "8px", fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, border: `1px solid ${mode === m ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.1)"}`, background: mode === m ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.04)", color: mode === m ? "#818cf8" : "#94a3b8", cursor: "pointer", textTransform: "capitalize" }}>{mode === m ? `→ ${m}` : m}</button>
        ))}
        <button className="btn-primary" onClick={process} style={{ marginLeft: "auto" }}>
          {mode === "encode" ? "Encode URL" : "Decode URL"}
        </button>
      </div>

      <div className="glass-card-static" style={{ borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#94a3b8" }}>Input</span>
        </div>
        <textarea className="glass-input glass-input-text" value={input} onChange={(e) => setInput(e.target.value)} rows={6} placeholder={mode === "encode" ? "https://example.com/path?name=John Doe&role=dev" : "https%3A%2F%2Fexample.com%2Fpath%3Fname%3DJohn%20Doe"} style={{ border: "none", borderRadius: 0 }} />
      </div>

      {error && <div style={{ background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.3)", borderRadius: "10px", padding: "10px 16px", fontFamily: "var(--font-mono)", fontSize: "13px", color: "#f43f5e" }}>✕ {error}</div>}

      {output && (
        <div className="glass-card-static" style={{ borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#94a3b8" }}>Output</span>
            <button className="btn-icon" onClick={copy} style={{ color: copied ? "#10b981" : undefined }}>{copied ? <Check size={15} /> : <Copy size={15} />}</button>
          </div>
          <textarea className="glass-input glass-input-text" value={output} readOnly rows={6} style={{ border: "none", borderRadius: 0, wordBreak: "break-all" }} />
        </div>
      )}
    </div>
  );
}
