"use client";
import { useState } from "react";
import { Copy, Check, Play } from "lucide-react";

export function JsonMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const minify = () => {
    try {
      setOutput(JSON.stringify(JSON.parse(input)));
      setError("");
    } catch (e: unknown) { setError((e as Error).message); setOutput(""); }
  };

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const savings = output && input ? Math.round((1 - output.length / input.length) * 100) : 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {savings > 0 && (
        <div style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: "10px", padding: "10px 16px", fontFamily: "var(--font-sans)", fontSize: "13px", color: "#10b981" }}>
          ✓ Reduced by {savings}% — {input.length} → {output.length} characters
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="btn-primary" onClick={minify} style={{ gap: "6px" }}><Play size={14} /> Minify</button>
      </div>
      <div className="glass-card-static" style={{ borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#94a3b8" }}>Input JSON</span>
        </div>
        <textarea className="glass-input" value={input} onChange={(e) => setInput(e.target.value)} rows={9} placeholder='{\n  "key": "value"\n}' style={{ border: "none", borderRadius: 0 }} />
      </div>
      {error && <div style={{ background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.3)", borderRadius: "10px", padding: "12px 16px", fontFamily: "var(--font-mono)", fontSize: "13px", color: "#f43f5e" }}>✕ {error}</div>}
      {output && (
        <div className="glass-card-static" style={{ borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#94a3b8" }}>Minified</span>
            <button className="btn-icon" onClick={copy} style={{ color: copied ? "#10b981" : undefined }}>{copied ? <Check size={15} /> : <Copy size={15} />}</button>
          </div>
          <textarea className="glass-input" value={output} readOnly rows={5} style={{ border: "none", borderRadius: 0, wordBreak: "break-all" }} />
        </div>
      )}
    </div>
  );
}
