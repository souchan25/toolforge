"use client";
import { useState } from "react";

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const toLinear = (v: number) => v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  return { r: toLinear(r), g: toLinear(g), b: toLinear(b) };
}

function luminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(fg: string, bg: string) {
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function isValidHex(h: string) { return /^#[0-9a-fA-F]{6}$/.test(h); }

export function ContrastChecker() {
  const [fg, setFg] = useState("#f1f5f9");
  const [bg, setBg] = useState("#0a0a1a");

  const ratio = isValidHex(fg) && isValidHex(bg) ? contrast(fg, bg) : null;
  const r = ratio ?? 0;

  const aaLarge = r >= 3;
  const aaNormal = r >= 4.5;
  const aaaLarge = r >= 4.5;
  const aaaNormal = r >= 7;

  const badge = (pass: boolean) => (
    <span style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "12px", fontWeight: 700, background: pass ? "rgba(16,185,129,0.15)" : "rgba(244,63,94,0.15)", border: `1px solid ${pass ? "rgba(16,185,129,0.3)" : "rgba(244,63,94,0.3)"}`, color: pass ? "#10b981" : "#f43f5e" }}>
      {pass ? "Pass" : "Fail"}
    </span>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Live preview */}
      {isValidHex(fg) && isValidHex(bg) && (
        <div style={{ background: bg, borderRadius: "16px", padding: "32px", textAlign: "center", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p style={{ color: fg, fontFamily: "var(--font-sans)", fontSize: "20px", fontWeight: 700, margin: "0 0 8px" }}>
            The quick brown fox jumps over the lazy dog.
          </p>
          <p style={{ color: fg, fontFamily: "var(--font-sans)", fontSize: "14px", margin: 0 }}>
            Small text — 14px regular. Used for WCAG AA Normal evaluation.
          </p>
        </div>
      )}

      {/* Color inputs */}
      <div className="tool-two-col">
        {[{ label: "Foreground (Text)", val: fg, set: setFg }, { label: "Background", val: bg, set: setBg }].map(({ label, val, set }) => (
          <div key={label} className="glass-card-static" style={{ borderRadius: "12px", padding: "16px" }}>
            <label style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#94a3b8", marginBottom: "10px", display: "block" }}>{label}</label>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <input type="color" value={val} onChange={(e) => set(e.target.value)} style={{ width: "44px", height: "36px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", background: "transparent" }} />
              <input className="glass-input glass-input-text" value={val} onChange={(e) => set(e.target.value)} style={{ flex: 1 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Results */}
      {ratio !== null && (
        <div className="glass-card-static" style={{ borderRadius: "12px", padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "40px", fontWeight: 800, color: "#f1f5f9" }}>{r.toFixed(2)}:1</span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#94a3b8" }}>Contrast Ratio</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "10px" }}>
            {[
              { label: "AA — Normal Text (4.5:1)", pass: aaNormal },
              { label: "AA — Large Text (3:1)", pass: aaLarge },
              { label: "AAA — Normal Text (7:1)", pass: aaaNormal },
              { label: "AAA — Large Text (4.5:1)", pass: aaaLarge },
            ].map(({ label, pass }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "10px 14px" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#94a3b8" }}>{label}</span>
                {badge(pass)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
