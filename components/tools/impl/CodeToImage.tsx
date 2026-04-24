"use client";
import { useState, useRef, useCallback } from "react";
import { Download } from "lucide-react";

const THEMES = [
  { id: "dark", label: "Dark", bg: "#0d1117", text: "#c9d1d9", comment: "#8b949e", keyword: "#ff7b72", string: "#a5d6ff", fn: "#d2a8ff" },
  { id: "midnight", label: "Midnight", bg: "#1a1b2e", text: "#e2e8f0", comment: "#64748b", keyword: "#818cf8", string: "#34d399", fn: "#f59e0b" },
  { id: "dracula", label: "Dracula", bg: "#282a36", text: "#f8f8f2", comment: "#6272a4", keyword: "#ff79c6", string: "#f1fa8c", fn: "#50fa7b" },
];

const GRADIENTS = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 100%)",
  "linear-gradient(135deg, #1e3a5f 0%, #0f2027 100%)",
  "linear-gradient(135deg, #f43f5e 0%, #8b5cf6 100%)",
  "linear-gradient(135deg, #059669 0%, #0891b2 100%)",
  "transparent",
];

// Solid fallback colors for canvas rendering (canvas can't render CSS gradients directly)
const GRADIENT_SOLIDS: [string, string][] = [
  ["#667eea", "#764ba2"],
  ["#0a0a1a", "#1a0a2e"],
  ["#1e3a5f", "#0f2027"],
  ["#f43f5e", "#8b5cf6"],
  ["#059669", "#0891b2"],
  ["#0a0a1a", "#0a0a1a"],
];

const DEFAULT_CODE = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55`;

export function CodeToImage() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [language, setLanguage] = useState("javascript");
  const [themeId, setThemeId] = useState("midnight");
  const [gradientIdx, setGradientIdx] = useState(1);
  const [padding, setPadding] = useState(32);
  const previewRef = useRef<HTMLDivElement>(null);

  const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0];

  const download = useCallback(() => {
    const el = previewRef.current;
    if (!el) return;

    const scale = 2; // Retina quality
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Measure the preview element
    const rect = el.getBoundingClientRect();
    canvas.width = rect.width * scale;
    canvas.height = rect.height * scale;
    ctx.scale(scale, scale);

    // Draw background gradient
    const [c1, c2] = GRADIENT_SOLIDS[gradientIdx] ?? GRADIENT_SOLIDS[0];
    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, c1);
    grad.addColorStop(1, c2);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(0, 0, rect.width, rect.height, 20);
    ctx.fill();

    // Draw the code editor card
    const cardX = padding;
    const cardY = padding;
    const cardW = rect.width - padding * 2;
    const lineHeight = 14 * 1.7;
    const lines = code.split("\n");
    const chromeHeight = 38;
    const codeTop = 20;
    const codeBottom = 20;
    const cardH = chromeHeight + codeTop + lines.length * lineHeight + codeBottom;

    // Card background with rounded corners
    ctx.fillStyle = theme.bg;
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, 12);
    ctx.fill();

    // Card border
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, 12);
    ctx.stroke();

    // Card shadow
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 60;
    ctx.shadowOffsetY = 20;
    ctx.fillStyle = theme.bg;
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, 12);
    ctx.fill();
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // Window chrome
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, chromeHeight, [12, 12, 0, 0]);
    ctx.fill();

    // Traffic lights
    const dotY = cardY + chromeHeight / 2;
    const dotStartX = cardX + 16;
    const dotColors = ["#ff5f57", "#febc2e", "#28c840"];
    dotColors.forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(dotStartX + i * 20, dotY, 6, 0, Math.PI * 2);
      ctx.fill();
    });

    // Language label
    ctx.fillStyle = "#475569";
    ctx.font = "12px 'Inter', system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(language, cardX + cardW / 2, dotY + 4);
    ctx.textAlign = "left";

    // Code text
    ctx.fillStyle = theme.text;
    ctx.font = "14px 'JetBrains Mono', 'Fira Code', monospace";
    const codeStartX = cardX + 24;
    const codeStartY = cardY + chromeHeight + codeTop + 14;
    lines.forEach((line, i) => {
      ctx.fillText(line, codeStartX, codeStartY + i * lineHeight);
    });

    // Download
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `code-snippet-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  }, [code, language, theme, gradientIdx, padding]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Controls */}
      <div className="glass-card-static" style={{ borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "flex-end" }}>
          <div>
            <label style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#94a3b8", marginBottom: "6px", display: "block" }}>Language</label>
            <select className="glass-input glass-input-text" value={language} onChange={(e) => setLanguage(e.target.value)} style={{ width: "140px", cursor: "pointer" }}>
              {["javascript","typescript","python","css","html","json","bash","rust","go"].map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#94a3b8", marginBottom: "6px", display: "block" }}>Theme</label>
            <div style={{ display: "flex", gap: "6px" }}>
              {THEMES.map((t) => (
                <button key={t.id} onClick={() => setThemeId(t.id)} style={{ padding: "6px 12px", borderRadius: "7px", fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600, border: `1px solid ${themeId === t.id ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.1)"}`, background: themeId === t.id ? "rgba(99,102,241,0.18)" : t.bg, color: themeId === t.id ? "#818cf8" : "#94a3b8", cursor: "pointer" }}>{t.label}</button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#94a3b8", marginBottom: "6px", display: "block" }}>Background</label>
            <div style={{ display: "flex", gap: "6px" }}>
              {GRADIENTS.map((g, i) => (
                <button key={i} onClick={() => setGradientIdx(i)} style={{ width: "28px", height: "28px", borderRadius: "6px", border: `2px solid ${gradientIdx === i ? "#818cf8" : "rgba(255,255,255,0.1)"}`, background: g === "transparent" ? "rgba(255,255,255,0.05)" : g, cursor: "pointer" }} title={g} />
              ))}
            </div>
          </div>
          <button className="btn-primary" onClick={download} style={{ gap: "6px", marginLeft: "auto" }}>
            <Download size={14} /> Download PNG
          </button>
        </div>
        <div>
          <label style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#94a3b8", marginBottom: "6px", display: "block" }}>Padding: {padding}px</label>
          <input type="range" min={8} max={80} value={padding} onChange={(e) => setPadding(Number(e.target.value))} style={{ width: "200px", accentColor: "#6366f1" }} />
        </div>
      </div>

      {/* Code Input */}
      <div className="glass-card-static" style={{ borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#94a3b8" }}>Code</span>
        </div>
        <textarea className="glass-input" value={code} onChange={(e) => setCode(e.target.value)} rows={8} style={{ border: "none", borderRadius: 0 }} />
      </div>

      {/* Preview */}
      <div>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#475569", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Preview</div>
        <div ref={previewRef} style={{ display: "inline-block", minWidth: "100%", padding: `${padding}px`, background: GRADIENTS[gradientIdx], borderRadius: "20px" }}>
          <div style={{
            background: theme.bg,
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}>
            {/* Window chrome */}
            <div style={{ padding: "12px 16px", background: "rgba(255,255,255,0.04)", display: "flex", gap: "8px", alignItems: "center" }}>
              <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ff5f57" }} />
              <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#febc2e" }} />
              <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#28c840" }} />
              <span style={{ flex: 1, textAlign: "center", fontFamily: "var(--font-sans)", fontSize: "12px", color: "#475569" }}>{language}</span>
            </div>
            <pre style={{ margin: 0, padding: "20px 24px", fontFamily: "var(--font-mono)", fontSize: "14px", lineHeight: 1.7, color: theme.text, overflowX: "auto", whiteSpace: "pre" }}>
              {code}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
