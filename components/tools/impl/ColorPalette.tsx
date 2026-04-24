"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

type PaletteType = "complementary" | "analogous" | "triadic" | "monochromatic";

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
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
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function generatePalette(hex: string, type: PaletteType): string[] {
  const [h, s, l] = hexToHsl(hex);
  switch (type) {
    case "complementary": return [hex, hslToHex((h + 180) % 360, s, l)];
    case "analogous": return [hslToHex((h - 30 + 360) % 360, s, l), hex, hslToHex((h + 30) % 360, s, l)];
    case "triadic": return [hex, hslToHex((h + 120) % 360, s, l), hslToHex((h + 240) % 360, s, l)];
    case "monochromatic": return [
      hslToHex(h, s, Math.max(5, l - 30)),
      hslToHex(h, s, Math.max(5, l - 15)),
      hex,
      hslToHex(h, s, Math.min(95, l + 15)),
      hslToHex(h, s, Math.min(95, l + 30)),
    ];
  }
}

const PALETTE_TYPES: PaletteType[] = ["complementary", "analogous", "triadic", "monochromatic"];

export function ColorPalette() {
  const [seed, setSeed] = useState("#6366f1");
  const [type, setType] = useState<PaletteType>("analogous");
  const [copied, setCopied] = useState<string | null>(null);

  const palette = generatePalette(seed, type);

  const copy = (val: string) => { navigator.clipboard.writeText(val); setCopied(val); setTimeout(() => setCopied(null), 2000); };
  const copyAll = () => {
    const css = palette.map((c, i) => `--color-${i + 1}: ${c};`).join("\n");
    copy(`:root {\n${css}\n}`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Seed + type */}
      <div className="glass-card-static" style={{ borderRadius: "12px", padding: "20px", display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#94a3b8" }}>Seed Color</label>
          <input type="color" value={seed} onChange={(e) => setSeed(e.target.value)} style={{ width: "48px", height: "36px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", background: "transparent" }} />
          <input className="glass-input glass-input-text" value={seed} onChange={(e) => setSeed(e.target.value)} style={{ width: "120px" }} />
        </div>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {PALETTE_TYPES.map((t) => (
            <button key={t} onClick={() => setType(t)} style={{ padding: "6px 12px", borderRadius: "7px", fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600, border: `1px solid ${type === t ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.1)"}`, background: type === t ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.04)", color: type === t ? "#818cf8" : "#94a3b8", cursor: "pointer", textTransform: "capitalize" }}>
              {t}
            </button>
          ))}
        </div>
        <button className="btn-ghost" onClick={copyAll} style={{ marginLeft: "auto", gap: "6px", fontSize: "13px", padding: "8px 14px" }}>
          <Copy size={13} /> Export CSS
        </button>
      </div>

      {/* Palette swatches */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {palette.map((col, i) => (
          <div key={i} style={{ flex: 1, minWidth: "120px" }}>
            <div
              style={{ height: "120px", borderRadius: "12px", background: col, cursor: "pointer", transition: "transform 0.2s", border: "1px solid rgba(255,255,255,0.08)" }}
              onClick={() => copy(col)}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "#94a3b8" }}>{col.toUpperCase()}</span>
              <button className="btn-icon" onClick={() => copy(col)} style={{ width: "24px", height: "24px", color: copied === col ? "#10b981" : undefined }}>
                {copied === col ? <Check size={12} /> : <Copy size={12} />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
