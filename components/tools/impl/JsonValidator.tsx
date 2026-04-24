"use client";
import { useState } from "react";
import { ShieldCheck, ShieldX, Play } from "lucide-react";

export function JsonValidator() {
  const [input, setInput] = useState("");
  const [valid, setValid] = useState<boolean | null>(null);
  const [error, setError] = useState("");

  const validate = () => {
    if (!input.trim()) return;
    try { JSON.parse(input); setValid(true); setError(""); }
    catch (e: unknown) { setValid(false); setError((e as Error).message); }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {valid !== null && (
        <div style={{
          background: valid ? "rgba(16,185,129,0.1)" : "rgba(244,63,94,0.1)",
          border: `1px solid ${valid ? "rgba(16,185,129,0.3)" : "rgba(244,63,94,0.3)"}`,
          borderRadius: "12px", padding: "16px 20px",
          display: "flex", alignItems: "flex-start", gap: "12px",
        }}>
          {valid ? <ShieldCheck size={22} color="#10b981" /> : <ShieldX size={22} color="#f43f5e" />}
          <div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: "15px", fontWeight: 700, color: valid ? "#10b981" : "#f43f5e", marginBottom: "4px" }}>
              {valid ? "Valid JSON" : "Invalid JSON"}
            </div>
            {!valid && <div style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "#f43f5e" }}>{error}</div>}
          </div>
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="btn-primary" onClick={validate} style={{ gap: "6px" }}><Play size={14} /> Validate</button>
      </div>
      <div className="glass-card-static" style={{ borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#94a3b8" }}>JSON to Validate</span>
        </div>
        <textarea className="glass-input" value={input} onChange={(e) => { setInput(e.target.value); setValid(null); }} rows={14} placeholder='{"type":"any valid JSON here"}' style={{ border: "none", borderRadius: 0 }} />
      </div>
    </div>
  );
}
