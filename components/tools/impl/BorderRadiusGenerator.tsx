"use client";
import { useState } from "react";
import { Copy, Check, Link } from "lucide-react";

export function BorderRadiusGenerator() {
  const [tl, setTl] = useState(16);
  const [tr, setTr] = useState(16);
  const [br, setBr] = useState(16);
  const [bl, setBl] = useState(16);
  const [locked, setLocked] = useState(true);
  const [copied, setCopied] = useState(false);

  const setAll = (v: number) => { setTl(v); setTr(v); setBr(v); setBl(v); };

  const value = tl === tr && tr === br && br === bl ? `${tl}px` : `${tl}px ${tr}px ${br}px ${bl}px`;
  const css = `border-radius: ${value};`;
  const copy = () => { navigator.clipboard.writeText(css); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const corners = [
    { label: "Top Left",     val: tl, set: (v: number) => locked ? setAll(v) : setTl(v) },
    { label: "Top Right",    val: tr, set: (v: number) => locked ? setAll(v) : setTr(v) },
    { label: "Bottom Right", val: br, set: (v: number) => locked ? setAll(v) : setBr(v) },
    { label: "Bottom Left",  val: bl, set: (v: number) => locked ? setAll(v) : setBl(v) },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Preview */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "40px", background: "rgba(255,255,255,0.02)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ width: "140px", height: "100px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: value, transition: "border-radius 0.2s" }} />
      </div>

      {/* Controls */}
      <div className="glass-card-static" style={{ borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#94a3b8", fontWeight: 600 }}>Corner Radii</span>
          <button
            onClick={() => setLocked((v) => !v)}
            style={{ display: "flex", alignItems: "center", gap: "6px", padding: "5px 12px", borderRadius: "7px", fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600, border: `1px solid ${locked ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.1)"}`, background: locked ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.04)", color: locked ? "#818cf8" : "#94a3b8", cursor: "pointer" }}
          >
            <Link size={12} /> {locked ? "Linked" : "Individual"}
          </button>
        </div>
        {corners.map((c) => (
          <div key={c.label}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <label style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#94a3b8" }}>{c.label}</label>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "#818cf8" }}>{c.val}px</span>
            </div>
            <input type="range" min={0} max={100} value={c.val} onChange={(e) => c.set(Number(e.target.value))} style={{ width: "100%", accentColor: "#6366f1" }} />
          </div>
        ))}
      </div>

      {/* Output */}
      <div className="glass-card-static" style={{ borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#94a3b8" }}>CSS Output</span>
          <button className="btn-icon" onClick={copy} style={{ color: copied ? "#10b981" : undefined }}>{copied ? <Check size={15} /> : <Copy size={15} />}</button>
        </div>
        <pre style={{ padding: "14px 16px", fontFamily: "var(--font-mono)", fontSize: "13px", color: "#818cf8", margin: 0 }}>{css}</pre>
      </div>
    </div>
  );
}
