"use client";
// components/tools/HowToUse.tsx
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Props {
  steps: string[];
  style?: React.CSSProperties;
}

export function HowToUse({ steps, style }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-card-static" style={{ borderRadius: "12px", overflow: "hidden", ...style }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: "#f1f5f9",
          fontFamily: "var(--font-sans)",
          fontSize: "14px",
          fontWeight: 600,
        }}
      >
        How to Use
        <ChevronDown
          size={16}
          color="#94a3b8"
          style={{ transition: "transform 0.25s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && (
        <ol style={{ padding: "0 20px 20px 20px", margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
          {steps.map((step, i) => (
            <li key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <span
                style={{
                  width: "24px",
                  height: "24px",
                  background: "rgba(99,102,241,0.15)",
                  border: "1px solid rgba(99,102,241,0.3)",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#818cf8",
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#94a3b8", lineHeight: 1.6 }}>{step}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
