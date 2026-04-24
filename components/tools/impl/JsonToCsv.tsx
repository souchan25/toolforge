"use client";
import { useState } from "react";
import { Copy, Check, Play, Download } from "lucide-react";

function jsonToCsv(json: unknown[]): string {
  if (!Array.isArray(json) || json.length === 0) throw new Error("Input must be a non-empty JSON array.");
  const headers = Array.from(new Set(json.flatMap((r) => Object.keys(r as Record<string, unknown>))));
  const rows = json.map((r) =>
    headers.map((h) => {
      const v = (r as Record<string, unknown>)[h];
      const s = v === null || v === undefined ? "" : String(v);
      return s.includes(",") || s.includes('"') || s.includes("\n") ? `"${s.replace(/"/g, '""')}"` : s;
    }).join(",")
  );
  return [headers.join(","), ...rows].join("\n");
}

export function JsonToCsv() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const convert = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(jsonToCsv(parsed));
      setError("");
    } catch (e: unknown) { setError((e as Error).message); setOutput(""); }
  };

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const download = () => {
    const blob = new Blob([output], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "data.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="btn-primary" onClick={convert} style={{ gap: "6px" }}><Play size={14} /> Convert</button>
      </div>
      <div className="glass-card-static" style={{ borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#94a3b8" }}>JSON Array Input</span>
        </div>
        <textarea className="glass-input" value={input} onChange={(e) => setInput(e.target.value)} rows={10} placeholder='[{"name":"Alice","age":30},{"name":"Bob","age":25}]' style={{ border: "none", borderRadius: 0 }} />
      </div>
      {error && <div style={{ background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.3)", borderRadius: "10px", padding: "12px 16px", fontFamily: "var(--font-mono)", fontSize: "13px", color: "#f43f5e" }}>✕ {error}</div>}
      {output && (
        <div className="glass-card-static" style={{ borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#94a3b8" }}>CSV Output</span>
            <div style={{ display: "flex", gap: "8px" }}>
              <button className="btn-icon" onClick={copy} style={{ color: copied ? "#10b981" : undefined }}>{copied ? <Check size={15} /> : <Copy size={15} />}</button>
              <button className="btn-icon" onClick={download} title="Download .csv"><Download size={15} /></button>
            </div>
          </div>
          <textarea className="glass-input" value={output} readOnly rows={10} style={{ border: "none", borderRadius: 0 }} />
        </div>
      )}
    </div>
  );
}
