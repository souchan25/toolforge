"use client";
import { useState, useMemo } from "react";
import * as Diff from "diff";

export function TextDiff() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");

  const diffResult = useMemo(() => {
    if (!left && !right) return null;
    return Diff.diffLines(left, right);
  }, [left, right]);

  const added = diffResult?.filter((p) => p.added).reduce((a, p) => a + (p.count ?? 0), 0) ?? 0;
  const removed = diffResult?.filter((p) => p.removed).reduce((a, p) => a + (p.count ?? 0), 0) ?? 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Stats */}
      {diffResult && (
        <div style={{ display: "flex", gap: "12px" }}>
          <div className="glass-card-static" style={{ borderRadius: "8px", padding: "10px 16px", display: "flex", gap: "8px", alignItems: "center" }}>
            <span style={{ width: "10px", height: "10px", background: "#10b981", borderRadius: "50%" }} />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#f1f5f9" }}>+{added} added</span>
          </div>
          <div className="glass-card-static" style={{ borderRadius: "8px", padding: "10px 16px", display: "flex", gap: "8px", alignItems: "center" }}>
            <span style={{ width: "10px", height: "10px", background: "#f43f5e", borderRadius: "50%" }} />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#f1f5f9" }}>-{removed} removed</span>
          </div>
        </div>
      )}

      {/* Side-by-side input */}
      <div className="tool-two-col">
        {[
          { label: "Original", value: left, set: setLeft },
          { label: "Modified", value: right, set: setRight },
        ].map(({ label, value, set }) => (
          <div key={label} className="glass-card-static" style={{ borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#94a3b8" }}>{label}</span>
            </div>
            <textarea
              className="glass-input"
              value={value}
              onChange={(e) => set(e.target.value)}
              placeholder={`Paste ${label.toLowerCase()} text…`}
              rows={10}
              style={{ border: "none", borderRadius: 0, width: "100%" }}
            />
          </div>
        ))}
      </div>

      {/* Diff output */}
      {diffResult && (
        <div className="glass-card-static" style={{ borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#94a3b8" }}>Diff Result</span>
          </div>
          <div style={{ padding: "16px", fontFamily: "var(--font-mono)", fontSize: "13px", lineHeight: 1.7, overflowX: "auto", maxHeight: "400px", overflowY: "auto" }}>
            {diffResult.map((part, i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  background: part.added ? "rgba(16,185,129,0.12)" : part.removed ? "rgba(244,63,94,0.12)" : "transparent",
                  color: part.added ? "#10b981" : part.removed ? "#f43f5e" : "#94a3b8",
                  padding: "0 8px",
                  borderLeft: `3px solid ${part.added ? "#10b981" : part.removed ? "#f43f5e" : "transparent"}`,
                  whiteSpace: "pre-wrap",
                }}
              >
                {part.added ? "+" : part.removed ? "-" : " "}{part.value}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
