"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function parseInput(val: string): string | null {
  val = val.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(val)) return val;
  if (/^#[0-9a-fA-F]{3}$/.test(val)) {
    const [, r, g, b] = val.match(/^#(.)(.)(.)$/)!;
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  const m = val.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (m) {
    const toH = (n: number) => n.toString(16).padStart(2, "0");
    return `#${toH(+m[1])}${toH(+m[2])}${toH(+m[3])}`;
  }
  return null;
}

export function ColorPicker() {
  const [hex, setHex] = useState("#6366f1");
  const [input, setInput] = useState("#6366f1");
  const [copied, setCopied] = useState<string | null>(null);

  const apply = () => {
    const parsed = parseInput(input);
    if (parsed) setHex(parsed);
  };

  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);

  const formats = [
    { label: "HEX", value: hex.toUpperCase() },
    { label: "RGB", value: `rgb(${r}, ${g}, ${b})` },
    { label: "HSL", value: `hsl(${h}, ${s}%, ${l}%)` },
  ];

  const copy = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopied(val);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Color swatch + picker */}
      <div className="glass-card-static" style={{ borderRadius: "16px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ height: "180px", background: hex, transition: "background 0.2s" }} />
        <div style={{ padding: "20px", display: "flex", gap: "12px", alignItems: "center" }}>
          <input
            type="color"
            value={hex}
            onChange={(e) => { setHex(e.target.value); setInput(e.target.value); }}
            style={{ width: "56px", height: "44px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", background: "transparent" }}
          />
          <input
            className="glass-input glass-input-text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onBlur={apply}
            onKeyDown={(e) => e.key === "Enter" && apply()}
            placeholder="#6366f1 / rgb(99,102,241) / hsl(239,84%,67%)"
            style={{ flex: 1 }}
          />
        </div>
      </div>

      {/* Format cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
        {formats.map((f) => (
          <div key={f.label} className="glass-card-static" style={{ borderRadius: "12px", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#475569", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>{f.label}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "#f1f5f9" }}>{f.value}</div>
            </div>
            <button className="btn-icon" onClick={() => copy(f.value)} style={{ color: copied === f.value ? "#10b981" : undefined }}>
              {copied === f.value ? <Check size={15} /> : <Copy size={15} />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
