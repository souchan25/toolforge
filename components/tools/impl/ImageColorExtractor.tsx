"use client";

import { useState, useRef } from "react";
import { Upload, Copy, Check, ImageIcon } from "lucide-react";

export function ImageColorExtractor() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [dominantColor, setDominantColor] = useState<string | null>(null);
  const [palette, setPalette] = useState<string[]>([]);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target?.result as string);
      // Reset colors until image loads
      setDominantColor(null);
      setPalette([]);
    };
    reader.readAsDataURL(file);
  };

  const handleImageLoad = async () => {
    if (!imgRef.current) return;
    try {
      const { getColorSync, getPaletteSync } = await import("colorthief");
      
      // Get dominant color
      const dominant = getColorSync(imgRef.current);
      if (dominant) {
        setDominantColor(dominant.hex());
      }

      // Get palette (e.g. 6 colors)
      const paletteArray = getPaletteSync(imgRef.current, { colorCount: 6 });
      if (paletteArray) {
        setPalette(paletteArray.map((c: any) => c.hex()));
      }
    } catch (e) {
      console.error("Failed to extract colors", e);
    }
  };



  const handleCopy = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div className="glass-card" style={{ padding: "32px", display: "flex", flexDirection: "column", alignItems: "center", borderStyle: "dashed" }}>
        <input 
          type="file" 
          accept="image/*" 
          id="image-upload" 
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
        <label 
          htmlFor="image-upload" 
          style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            gap: "12px",
            cursor: "pointer",
            width: "100%"
          }}
        >
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(99, 102, 241, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Upload size={32} color="#818cf8" />
          </div>
          <div style={{ fontSize: "16px", fontWeight: 600, color: "#f1f5f9" }}>Click to upload an image</div>
          <div style={{ fontSize: "13px", color: "#94a3b8" }}>JPG, PNG, WebP (Max 5MB)</div>
        </label>
      </div>

      {imageSrc && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {/* Image Preview */}
          <div className="glass-card" style={{ padding: "16px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "300px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              ref={imgRef}
              src={imageSrc} 
              alt="Uploaded preview" 
              style={{ maxWidth: "100%", maxHeight: "400px", borderRadius: "8px", objectFit: "contain" }}
              onLoad={handleImageLoad}
              crossOrigin="anonymous"
            />
          </div>

          {/* Extracted Colors */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            
            {dominantColor && (
              <div className="glass-card" style={{ padding: "20px" }}>
                <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#94a3b8", marginBottom: "16px" }}>Dominant Color</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ width: "80px", height: "80px", borderRadius: "12px", backgroundColor: dominantColor, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "20px", fontWeight: 700, color: "#f1f5f9", fontFamily: "var(--font-mono)", marginBottom: "8px" }}>
                      {dominantColor.toUpperCase()}
                    </div>
                    <button className="btn-ghost" onClick={() => handleCopy(dominantColor)} style={{ padding: "6px 12px", fontSize: "13px" }}>
                      {copiedColor === dominantColor ? <><Check size={14} color="#10b981" /> Copied</> : <><Copy size={14} /> Copy HEX</>}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {palette.length > 0 && (
              <div className="glass-card" style={{ padding: "20px" }}>
                <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#94a3b8", marginBottom: "16px" }}>Color Palette</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: "12px" }}>
                  {palette.map((color, i) => (
                    <div 
                      key={i} 
                      onClick={() => handleCopy(color)}
                      style={{ 
                        display: "flex", 
                        flexDirection: "column", 
                        cursor: "pointer",
                        transition: "transform 0.2s",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                      onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                    >
                      <div style={{ height: "60px", backgroundColor: color, borderRadius: "8px 8px 0 0" }} />
                      <div style={{ 
                        padding: "8px", 
                        background: "rgba(255,255,255,0.05)", 
                        borderRadius: "0 0 8px 8px", 
                        textAlign: "center",
                        fontSize: "12px",
                        fontFamily: "var(--font-mono)",
                        color: copiedColor === color ? "#10b981" : "#f1f5f9"
                      }}>
                        {copiedColor === color ? "COPIED" : color.toUpperCase()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!dominantColor && (
              <div className="glass-card" style={{ padding: "32px", display: "flex", justifyContent: "center", alignItems: "center", flex: 1 }}>
                <div style={{ color: "#94a3b8", display: "flex", alignItems: "center", gap: "8px" }}>
                  <ImageIcon className="animate-pulse" size={20} />
                  Extracting colors...
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
