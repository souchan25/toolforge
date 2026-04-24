"use client";
import { useState } from "react";
import { Copy, Check, Plus, Trash2 } from "lucide-react";

interface Stop { color: string; position: number; }

export function CssGradientGenerator() {
  const [type, setType] = useState<"linear" | "radial">("linear");
  const [angle, setAngle] = useState(90);
  const [stops, setStops] = useState<Stop[]>([
    { color: "#6366f1", position: 0 },
    { color: "#8b5cf6", position: 100 },
  ]);
  const [copied, setCopied] = useState(false);

  const css = type === "linear"
    ? `linear-gradient(${angle}deg, ${stops.map((s) => `${s.color} ${s.position}%`).join(", ")})`
    : `radial-gradient(circle, ${stops.map((s) => `${s.color} ${s.position}%`).join(", ")})`;

  const full = `background: ${css};`;
  const copy = () => { navigator.clipboard.writeText(full); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const updateStop = (i: number, field: keyof Stop, val: string | number) =>
    setStops((prev) => prev.map((s, idx) => idx === i ? { ...s, [field]: val } : s));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Live preview */}
      <div style={{ height: "160px", borderRadius: "16px", background: css, border: "1px solid rgba(255,255,255,0.1)" }} />

      {/* Controls */}
      <div className="glass-card-static" style={{ borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Type */}
        <div style={{ display: "flex", gap: "8px" }}>
          {(["linear", "radial"] as const).map((t) => (
            <button key={t} onClick={() => setType(t)} style={{ padding: "7px 16px", borderRadius: "8px", fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, border: `1px solid ${type === t ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.1)"}`, background: type === t ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.04)", color: type === t ? "#818cf8" : "#94a3b8", cursor: "pointer" }}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Angle */}
        {type === "linear" && (
          <div>
            <label style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#94a3b8", marginBottom: "8px", display: "block" }}>Angle: {angle}°</label>
            <input type="range" min={0} max={360} value={angle} onChange={(e) => setAngle(Number(e.target.value))} style={{ width: "100%", accentColor: "#6366f1" }} />
          </div>
        )}

        {/* Color stops */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <label style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#94a3b8", fontWeight: 600 }}>Color Stops</label>
            <button className="btn-icon" onClick={() => setStops((p) => [...p, { color: "#0891b2", position: 100 }])} title="Add stop"><Plus size={15} /></button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {stops.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input type="color" value={s.color} onChange={(e) => updateStop(i, "color", e.target.value)} style={{ width: "40px", height: "36px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", background: "transparent" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "#94a3b8", width: "80px" }}>{s.color}</span>
                <input type="range" min={0} max={100} value={s.position} onChange={(e) => updateStop(i, "position", Number(e.target.value))} style={{ flex: 1, accentColor: "#6366f1" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "#94a3b8", width: "36px" }}>{s.position}%</span>
                {stops.length > 2 && (
                  <button className="btn-icon" onClick={() => setStops((p) => p.filter((_, idx) => idx !== i))} title="Remove"><Trash2 size={13} /></button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Output */}
      <div className="glass-card-static" style={{ borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#94a3b8" }}>CSS Output</span>
          <button className="btn-icon" onClick={copy} style={{ color: copied ? "#10b981" : undefined }}>{copied ? <Check size={15} /> : <Copy size={15} />}</button>
        </div>
        <pre style={{ padding: "14px 16px", fontFamily: "var(--font-mono)", fontSize: "13px", color: "#818cf8", margin: 0, overflowX: "auto", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>{full}</pre>
      </div>
    </div>
  );
}
