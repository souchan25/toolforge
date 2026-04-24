"use client";
import { useState } from "react";
import { Copy, Check, RefreshCw, Clipboard } from "lucide-react";

function uuidV4(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (crypto.getRandomValues(new Uint8Array(1))[0] & 15);
    const v = c === "x" ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const generate = () => setUuids(Array.from({ length: count }, uuidV4));

  const copy = (val: string) => { navigator.clipboard.writeText(val); setCopied(val); setTimeout(() => setCopied(null), 2000); };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
    setCopied("all");
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div className="glass-card-static" style={{ borderRadius: "12px", padding: "16px", display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#94a3b8" }}>Count:</label>
          <input
            type="number" min={1} max={100} value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value))))}
            className="glass-input glass-input-text"
            style={{ width: "80px" }}
          />
        </div>
        <button className="btn-primary" onClick={generate} style={{ gap: "6px" }}>
          <RefreshCw size={14} /> Generate
        </button>
        {uuids.length > 0 && (
          <button className="btn-ghost" onClick={copyAll} style={{ gap: "6px", fontSize: "13px", padding: "8px 14px" }}>
            {copied === "all" ? <><Check size={14} /> Copied!</> : <><Clipboard size={14} /> Copy All</>}
          </button>
        )}
      </div>

      {uuids.length > 0 && (
        <div className="glass-card-static" style={{ borderRadius: "12px", overflow: "hidden" }}>
          {uuids.map((u) => (
            <div
              key={u}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                gap: "12px",
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "#94a3b8", letterSpacing: "0.02em" }}>{u}</span>
              <button className="btn-icon" onClick={() => copy(u)} style={{ color: copied === u ? "#10b981" : undefined, flexShrink: 0 }}>
                {copied === u ? <Check size={13} /> : <Copy size={13} />}
              </button>
            </div>
          ))}
        </div>
      )}

      {uuids.length === 0 && (
        <div className="glass-card-static" style={{ borderRadius: "12px", padding: "48px", textAlign: "center", color: "#475569", fontFamily: "var(--font-sans)", fontSize: "14px" }}>
          Click Generate to create UUID v4 identifiers
        </div>
      )}
    </div>
  );
}
