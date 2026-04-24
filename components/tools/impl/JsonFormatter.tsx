"use client";
import { useState } from "react";
import { Copy, Check, Play, Trash2 } from "lucide-react";

export function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const format = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError("");
    } catch (e: unknown) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clear = () => { setInput(""); setOutput(""); setError(""); };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Options / Actions */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#94a3b8" }}>Indent:</label>
          {[2, 4].map((n) => (
            <button
              key={n}
              onClick={() => setIndent(n)}
              style={{
                padding: "5px 12px",
                borderRadius: "7px",
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                fontWeight: 600,
                border: `1px solid ${indent === n ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.1)"}`,
                background: indent === n ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.04)",
                color: indent === n ? "#818cf8" : "#94a3b8",
                cursor: "pointer",
              }}
            >
              {n} spaces
            </button>
          ))}
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
          <button className="btn-icon" onClick={clear} title="Clear"><Trash2 size={15} /></button>
          <button className="btn-primary" onClick={format} style={{ gap: "6px" }}><Play size={14} /> Format</button>
        </div>
      </div>

      {/* Input */}
      <div className="glass-card-static" style={{ borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#94a3b8" }}>Input JSON</span>
        </div>
        <textarea className="glass-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder='{"key": "value"}' rows={10} style={{ border: "none", borderRadius: 0 }} />
      </div>

      {/* Error */}
      {error && (
        <div style={{ background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.3)", borderRadius: "10px", padding: "12px 16px", fontFamily: "var(--font-mono)", fontSize: "13px", color: "#f43f5e" }}>
          ✕ {error}
        </div>
      )}

      {/* Output */}
      {output && (
        <div className="glass-card-static" style={{ borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#10b981" }}>✓ Valid JSON</span>
            <button className="btn-icon" onClick={copy} style={{ color: copied ? "#10b981" : undefined }}>
              {copied ? <Check size={15} /> : <Copy size={15} />}
            </button>
          </div>
          <textarea className="glass-input" value={output} readOnly rows={14} style={{ border: "none", borderRadius: 0 }} />
        </div>
      )}
    </div>
  );
}
