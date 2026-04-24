"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function FlexboxGenerator() {
  const [flexDirection, setFlexDirection] = useState("row");
  const [justifyContent, setJustifyContent] = useState("flex-start");
  const [alignItems, setAlignItems] = useState("stretch");
  const [flexWrap, setFlexWrap] = useState("nowrap");
  const [gap, setGap] = useState(16);
  const [itemCount, setItemCount] = useState(4);
  const [copied, setCopied] = useState(false);

  const generatedCss = `.container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-wrap: ${flexWrap};
  gap: ${gap}px;
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "24px" }}>
      {/* Sidebar Controls */}
      <div className="glass-card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#f1f5f9", marginBottom: "8px" }}>Flex Properties</h3>
        
        <div>
          <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "6px" }}>Flex Direction</label>
          <select className="glass-input" value={flexDirection} onChange={(e) => setFlexDirection(e.target.value)} style={{ width: "100%", padding: "8px", appearance: "auto" }}>
            <option value="row">row</option>
            <option value="row-reverse">row-reverse</option>
            <option value="column">column</option>
            <option value="column-reverse">column-reverse</option>
          </select>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "6px" }}>Justify Content</label>
          <select className="glass-input" value={justifyContent} onChange={(e) => setJustifyContent(e.target.value)} style={{ width: "100%", padding: "8px", appearance: "auto" }}>
            <option value="flex-start">flex-start</option>
            <option value="flex-end">flex-end</option>
            <option value="center">center</option>
            <option value="space-between">space-between</option>
            <option value="space-around">space-around</option>
            <option value="space-evenly">space-evenly</option>
          </select>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "6px" }}>Align Items</label>
          <select className="glass-input" value={alignItems} onChange={(e) => setAlignItems(e.target.value)} style={{ width: "100%", padding: "8px", appearance: "auto" }}>
            <option value="stretch">stretch</option>
            <option value="flex-start">flex-start</option>
            <option value="flex-end">flex-end</option>
            <option value="center">center</option>
            <option value="baseline">baseline</option>
          </select>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "6px" }}>Flex Wrap</label>
          <select className="glass-input" value={flexWrap} onChange={(e) => setFlexWrap(e.target.value)} style={{ width: "100%", padding: "8px", appearance: "auto" }}>
            <option value="nowrap">nowrap</option>
            <option value="wrap">wrap</option>
            <option value="wrap-reverse">wrap-reverse</option>
          </select>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <label style={{ fontSize: "13px", color: "#94a3b8" }}>Gap ({gap}px)</label>
          </div>
          <input type="range" min="0" max="64" value={gap} onChange={(e) => setGap(Number(e.target.value))} style={{ width: "100%", cursor: "pointer" }} />
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <label style={{ fontSize: "13px", color: "#94a3b8" }}>Item Count ({itemCount})</label>
          </div>
          <input type="range" min="1" max="12" value={itemCount} onChange={(e) => setItemCount(Number(e.target.value))} style={{ width: "100%", cursor: "pointer" }} />
        </div>

        <div style={{ marginTop: "16px", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 600 }}>CSS Output</span>
            <button className="btn-ghost" onClick={handleCopy} style={{ padding: "4px 8px", fontSize: "12px" }}>
              {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre style={{
            margin: 0,
            padding: "12px",
            background: "rgba(0,0,0,0.2)",
            borderRadius: "8px",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            color: "#818cf8",
            overflowX: "auto"
          }}>
            {generatedCss}
          </pre>
        </div>
      </div>

      {/* Live Preview */}
      <div className="glass-card" style={{ padding: "24px", display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#f1f5f9", marginBottom: "16px" }}>Live Preview</h3>
        <div style={{
          flex: 1,
          border: "1px dashed rgba(255,255,255,0.2)",
          borderRadius: "12px",
          backgroundColor: "rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: flexDirection as any,
          justifyContent: justifyContent,
          alignItems: alignItems,
          flexWrap: flexWrap as any,
          gap: `${gap}px`,
          padding: "16px",
          minHeight: "400px",
          overflow: "hidden"
        }}>
          {Array.from({ length: itemCount }).map((_, i) => (
            <div
              key={i}
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                minWidth: "80px",
                minHeight: "80px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
