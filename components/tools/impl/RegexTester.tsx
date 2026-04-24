"use client";
import { useState, useMemo } from "react";

function escapeHtml(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("gi");
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog. The fox was very quick.");

  const ALL_FLAGS = ["g", "i", "m", "s"];

  const toggleFlag = (f: string) =>
    setFlags((prev) => prev.includes(f) ? prev.replace(f, "") : prev + f);

  // Compute error, matches, and highlighted HTML as derived state (no setState during render)
  const { error, matches, highlighted } = useMemo(() => {
    if (!pattern.trim()) {
      return { error: "", matches: [] as RegExpMatchArray[], highlighted: escapeHtml(text) };
    }
    try {
      const rx = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      const allMatches = Array.from(text.matchAll(rx));

      // Build highlighted HTML by working on the raw text and escaping segments individually
      let html = "";
      let lastIndex = 0;
      // Use a fresh regex for matching positions on the raw text
      const rxHighlight = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      let match: RegExpExecArray | null;
      while ((match = rxHighlight.exec(text)) !== null) {
        // Append text before this match (escaped)
        html += escapeHtml(text.slice(lastIndex, match.index));
        // Append the match wrapped in a mark tag (escaped)
        html += `<mark class="regex-match">${escapeHtml(match[0])}</mark>`;
        lastIndex = match.index + match[0].length;
        // Prevent infinite loop on zero-length matches
        if (match[0].length === 0) {
          rxHighlight.lastIndex++;
        }
      }
      html += escapeHtml(text.slice(lastIndex));

      return { error: "", matches: allMatches, highlighted: html };
    } catch (e: unknown) {
      return { error: (e as Error).message, matches: [] as RegExpMatchArray[], highlighted: escapeHtml(text) };
    }
  }, [pattern, flags, text]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Pattern + Flags */}
      <div className="glass-card-static" style={{ borderRadius: "12px", padding: "16px", display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1, minWidth: "240px" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "18px", color: "#475569" }}>/</span>
          <input
            className="glass-input"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="your pattern here"
            style={{ flex: 1 }}
          />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "18px", color: "#475569" }}>/</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "16px", color: "#818cf8" }}>{flags}</span>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          {ALL_FLAGS.map((f) => (
            <button
              key={f}
              onClick={() => toggleFlag(f)}
              style={{ padding: "5px 10px", borderRadius: "6px", fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: 700, border: `1px solid ${flags.includes(f) ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.1)"}`, background: flags.includes(f) ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.04)", color: flags.includes(f) ? "#818cf8" : "#94a3b8", cursor: "pointer" }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {error && <div style={{ background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.3)", borderRadius: "10px", padding: "10px 16px", fontFamily: "var(--font-mono)", fontSize: "13px", color: "#f43f5e" }}>✕ {error}</div>}

      {/* Match count */}
      {pattern && !error && (
        <div style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: matches.length > 0 ? "#10b981" : "#94a3b8" }}>
          {matches.length > 0 ? `✓ ${matches.length} match${matches.length !== 1 ? "es" : ""} found` : "No matches"}
        </div>
      )}

      {/* Test string */}
      <div className="glass-card-static" style={{ borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#94a3b8" }}>Test String</span>
        </div>
        <textarea className="glass-input glass-input-text" value={text} onChange={(e) => setText(e.target.value)} rows={5} style={{ border: "none", borderRadius: 0 }} />
      </div>

      {/* Highlighted */}
      {pattern && (
        <div className="glass-card-static" style={{ borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#94a3b8" }}>Match Highlights</span>
          </div>
          <div
            style={{ padding: "14px 16px", fontFamily: "var(--font-mono)", fontSize: "14px", color: "#94a3b8", lineHeight: 1.7, whiteSpace: "pre-wrap", wordBreak: "break-word" }}
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </div>
      )}

      {/* Cheatsheet */}
      <div className="glass-card-static" style={{ borderRadius: "12px", padding: "16px" }}>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px" }}>Quick Cheatsheet</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {[
            [".","any char"],["\\d","digit"],["\\w","word char"],["\\s","whitespace"],
            ["^","start"],["$","end"],["*","0 or more"],["+","1 or more"],
            ["?","optional"],["{n}","exactly n"],["[abc]","char class"],["(a|b)","group"],
          ].map(([sym, desc]) => (
            <div key={sym} style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "6px", padding: "4px 10px" }}>
              <code style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "#818cf8" }}>{sym}</code>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#475569" }}>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
