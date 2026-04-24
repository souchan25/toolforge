"use client";
import { useState, useMemo } from "react";

export function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const lines = text === "" ? 0 : text.split("\n").length;
    const sentences = text === "" ? 0 : (text.match(/[.!?]+/g) || []).length;
    const readingTime = Math.max(1, Math.ceil(words / 200));
    return { words, chars, charsNoSpaces, lines, sentences, readingTime };
  }, [text]);

  const statCards = [
    { label: "Words", value: stats.words, color: "#6366f1" },
    { label: "Characters", value: stats.chars, color: "#8b5cf6" },
    { label: "No Spaces", value: stats.charsNoSpaces, color: "#0891b2" },
    { label: "Lines", value: stats.lines, color: "#10b981" },
    { label: "Sentences", value: stats.sentences, color: "#f59e0b" },
    { label: "~Read Time", value: `${stats.readingTime}m`, color: "#f43f5e" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "12px" }}>
        {statCards.map((s) => (
          <div key={s.label} className="glass-card-static" style={{ padding: "16px", textAlign: "center", borderRadius: "12px" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#94a3b8", marginTop: "4px", fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="glass-card-static" style={{ borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <label style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#94a3b8" }}>Input Text</label>
          <button className="btn-icon" onClick={() => setText("")} title="Clear" style={{ width: "28px", height: "28px" }}>
            <span style={{ fontSize: "14px" }}>✕</span>
          </button>
        </div>
        <textarea
          className="glass-input glass-input-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here… stats update in real time."
          rows={12}
          style={{ border: "none", borderRadius: 0, resize: "vertical" }}
        />
      </div>
    </div>
  );
}
