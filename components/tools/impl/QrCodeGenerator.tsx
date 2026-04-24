"use client";

import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download, Palette } from "lucide-react";

export function QrCodeGenerator() {
  const [text, setText] = useState("https://toolforge.com");
  const [fgColor, setFgColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#0f172a"); // default to a dark blue slate to match glassmorphism
  const [size, setSize] = useState(256);
  
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) return;
    
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = url;
    link.click();
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "24px" }}>
      {/* Configuration */}
      <div className="glass-card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#f1f5f9" }}>QR Code Content</h3>
        
        <div>
          <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "8px" }}>URL or Text</label>
          <textarea
            className="glass-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: "100%", height: "120px", resize: "vertical", padding: "12px", fontFamily: "var(--font-mono)", fontSize: "14px" }}
            placeholder="Enter URL, email, or text to encode..."
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#94a3b8", marginBottom: "8px" }}>
              <Palette size={14} /> Foreground Color
            </label>
            <div style={{ display: "flex", gap: "8px" }}>
              <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} style={{ width: "40px", height: "40px", padding: "0", border: "none", borderRadius: "8px", cursor: "pointer", background: "none" }} />
              <input type="text" className="glass-input" value={fgColor} onChange={(e) => setFgColor(e.target.value)} style={{ flex: 1, fontFamily: "var(--font-mono)" }} />
            </div>
          </div>
          <div>
            <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#94a3b8", marginBottom: "8px" }}>
              <Palette size={14} /> Background Color
            </label>
            <div style={{ display: "flex", gap: "8px" }}>
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} style={{ width: "40px", height: "40px", padding: "0", border: "none", borderRadius: "8px", cursor: "pointer", background: "none" }} />
              <input type="text" className="glass-input" value={bgColor} onChange={(e) => setBgColor(e.target.value)} style={{ flex: 1, fontFamily: "var(--font-mono)" }} />
            </div>
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <label style={{ fontSize: "13px", color: "#94a3b8" }}>Size ({size}px)</label>
          </div>
          <input type="range" min="128" max="512" step="32" value={size} onChange={(e) => setSize(Number(e.target.value))} style={{ width: "100%", cursor: "pointer" }} />
        </div>
      </div>

      {/* Preview */}
      <div className="glass-card" style={{ padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#f1f5f9", alignSelf: "flex-start" }}>Preview</h3>
        
        <div 
          ref={qrRef}
          style={{ 
            padding: "16px", 
            background: bgColor, 
            borderRadius: "12px", 
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            display: "inline-block"
          }}
        >
          <QRCodeCanvas 
            value={text || " "} 
            size={size} 
            bgColor={bgColor}
            fgColor={fgColor}
            level="H" 
            includeMargin={false}
          />
        </div>

        <button className="btn-primary" onClick={handleDownload} style={{ width: "100%" }}>
          <Download size={16} /> Download PNG
        </button>
      </div>
    </div>
  );
}
