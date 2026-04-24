"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function BoxShadowGenerator() {
  const [hOff, setHOff] = useState(0);
  const [vOff, setVOff] = useState(8);
  const [blur, setBlur] = useState(20);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState("#6366f1");
  const [opacity, setOpacity] = useState(40);
  const [inset, setInset] = useState(false);
  const [copied, setCopied] = useState(false);

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  const shadowVal = `${inset ? "inset " : ""}${hOff}px ${vOff}px ${blur}px ${spread}px rgba(${hexToRgb(color)}, ${(opacity / 100).toFixed(2)})`;
  const cssOutput = `box-shadow: ${shadowVal};`;

  const copy = () => { navigator.clipboard.writeText(cssOutput); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const sliders = [
    { label: "Horizontal Offset", val: hOff, set: setHOff, min: -50, max: 50 },
    { label: "Vertical Offset",   val: vOff, set: setVOff, min: -50, max: 50 },
    { label: "Blur Radius",        val: blur, set: setBlur, min: 0, max: 100 },
    { label: "Spread Radius",   val: spread, set: setSpread, min: -50, max: 50 },
    { label: "Opacity (%)",    val: opacity, set: setOpacity, min: 0, max: 100 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Preview */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "40px", background: "rgba(255,255,255,0.02)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ width: "120px", height: "120px", background: "#1f1f27", borderRadius: "16px", boxShadow: shadowVal }} />
      </div>

      {/* Controls */}
      <div className="glass-card-static" style={{ borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
        {sliders.map((s) => (
          <div key={s.label}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <label style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#94a3b8" }}>{s.label}</label>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "#818cf8" }}>{s.val}{s.label.includes("Opacity") ? "%" : "px"}</span>
            </div>
            <input type="range" min={s.min} max={s.max} value={s.val} onChange={(e) => s.set(Number(e.target.value))} style={{ width: "100%", accentColor: "#6366f1" }} />
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <label style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#94a3b8" }}>Color</label>
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ width: "40px", height: "32px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", background: "transparent" }} />
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <input type="checkbox" checked={inset} onChange={(e) => setInset(e.target.checked)} />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#94a3b8" }}>Inset</span>
          </label>
        </div>
      </div>

      {/* Output */}
      <div className="glass-card-static" style={{ borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#94a3b8" }}>CSS Output</span>
          <button className="btn-icon" onClick={copy} style={{ color: copied ? "#10b981" : undefined }}>{copied ? <Check size={15} /> : <Copy size={15} />}</button>
        </div>
        <pre style={{ padding: "14px 16px", fontFamily: "var(--font-mono)", fontSize: "13px", color: "#818cf8", margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-all" }}>{cssOutput}</pre>
      </div>
    </div>
  );
}
