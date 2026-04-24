"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CssGridGenerator() {
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(3);
  const [columnGap, setColumnGap] = useState(16);
  const [rowGap, setRowGap] = useState(16);
  const [copied, setCopied] = useState(false);

  const generatedCss = `.grid-container {
  display: grid;
  grid-template-columns: repeat(${columns}, 1fr);
  grid-template-rows: repeat(${rows}, 1fr);
  column-gap: ${columnGap}px;
  row-gap: ${rowGap}px;
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "24px" }}>
      {/* Sidebar Controls */}
      <div className="glass-card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#f1f5f9", marginBottom: "4px" }}>Grid Settings</h3>
        
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <label style={{ fontSize: "13px", color: "#94a3b8" }}>Columns ({columns})</label>
          </div>
          <input type="range" min="1" max="12" value={columns} onChange={(e) => setColumns(Number(e.target.value))} style={{ width: "100%", cursor: "pointer" }} />
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <label style={{ fontSize: "13px", color: "#94a3b8" }}>Rows ({rows})</label>
          </div>
          <input type="range" min="1" max="12" value={rows} onChange={(e) => setRows(Number(e.target.value))} style={{ width: "100%", cursor: "pointer" }} />
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <label style={{ fontSize: "13px", color: "#94a3b8" }}>Column Gap ({columnGap}px)</label>
          </div>
          <input type="range" min="0" max="64" value={columnGap} onChange={(e) => setColumnGap(Number(e.target.value))} style={{ width: "100%", cursor: "pointer" }} />
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <label style={{ fontSize: "13px", color: "#94a3b8" }}>Row Gap ({rowGap}px)</label>
          </div>
          <input type="range" min="0" max="64" value={rowGap} onChange={(e) => setRowGap(Number(e.target.value))} style={{ width: "100%", cursor: "pointer" }} />
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
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          columnGap: `${columnGap}px`,
          rowGap: `${rowGap}px`,
          padding: "16px",
          minHeight: "400px"
        }}>
          {Array.from({ length: columns * rows }).map((_, i) => (
            <div
              key={i}
              style={{
                background: "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 600,
                fontSize: "16px",
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
