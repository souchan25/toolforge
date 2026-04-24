"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function JwtDecoder() {
  const [token, setToken] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleDecode = () => {
    if (!token.trim()) {
      setHeader("");
      setPayload("");
      setError(null);
      return;
    }

    try {
      const parts = token.split(".");
      if (parts.length !== 3) throw new Error("Invalid JWT: Must have 3 parts (header.payload.signature)");

      const decodeBase64Url = (str: string) => {
        // Add removed at signs and pad with '='
        str = str.replace(/-/g, "+").replace(/_/g, "/");
        const pad = str.length % 4;
        if (pad) {
          if (pad === 1) throw new Error("Invalid base64 string");
          str += new Array(5 - pad).join("=");
        }
        return decodeURIComponent(
          atob(str)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
      };

      const decodedHeader = JSON.parse(decodeBase64Url(parts[0]));
      const decodedPayload = JSON.parse(decodeBase64Url(parts[1]));

      setHeader(JSON.stringify(decodedHeader, null, 2));
      setPayload(JSON.stringify(decodedPayload, null, 2));
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to decode token");
      setHeader("");
      setPayload("");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div className="glass-card" style={{ padding: "24px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#f1f5f9", marginBottom: "16px" }}>JWT String</h3>
        <textarea
          className="glass-input"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          style={{
            width: "100%",
            height: "120px",
            resize: "none",
            fontFamily: "var(--font-mono)",
            fontSize: "14px",
            wordBreak: "break-all"
          }}
          spellCheck={false}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
          <button className="btn-primary" onClick={handleDecode}>
            Decode Token
          </button>
        </div>
        {error && (
          <div style={{ marginTop: "16px", padding: "12px", color: "#ef4444", backgroundColor: "#ef444415", borderRadius: "8px", fontSize: "14px" }}>
            {error}
          </div>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <div className="glass-card" style={{ padding: "24px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#ef4444", marginBottom: "16px" }}>Header (Algorithm & Type)</h3>
          <textarea
            className="glass-input"
            value={header}
            readOnly
            style={{
              width: "100%",
              height: "200px",
              resize: "none",
              fontFamily: "var(--font-mono)",
              fontSize: "14px",
              color: "#ef4444"
            }}
          />
        </div>

        <div className="glass-card" style={{ padding: "24px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#a855f7", marginBottom: "16px" }}>Payload (Data)</h3>
          <textarea
            className="glass-input"
            value={payload}
            readOnly
            style={{
              width: "100%",
              height: "200px",
              resize: "none",
              fontFamily: "var(--font-mono)",
              fontSize: "14px",
              color: "#a855f7"
            }}
          />
        </div>
      </div>
    </div>
  );
}
