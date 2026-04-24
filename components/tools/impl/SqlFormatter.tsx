"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { format } from "sql-formatter";

export function SqlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [dialect, setDialect] = useState("sql");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }

    try {
      const formatted = format(input, {
        language: dialect as any,
        tabWidth: 2,
        keywordCase: "upper",
        linesBetweenQueries: 2,
      });
      setOutput(formatted);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Invalid SQL syntax");
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <span style={{ fontSize: "14px", color: "#94a3b8" }}>Dialect:</span>
          <select
            className="glass-input"
            value={dialect}
            onChange={(e) => setDialect(e.target.value)}
            style={{ appearance: "auto", padding: "6px 12px", fontSize: "14px" }}
          >
            <option value="sql">Standard SQL</option>
            <option value="postgresql">PostgreSQL</option>
            <option value="mysql">MySQL</option>
            <option value="mariadb">MariaDB</option>
            <option value="sqlite">SQLite</option>
            <option value="tsql">T-SQL</option>
          </select>
        </div>
        <button className="btn-primary" onClick={handleFormat}>
          Format SQL
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", minHeight: "400px" }}>
        <div className="glass-card" style={{ padding: "16px", display: "flex", flexDirection: "column" }}>
          <div style={{ marginBottom: "12px", fontWeight: 600, color: "#f1f5f9", fontSize: "14px" }}>
            Input Query
          </div>
          <textarea
            className="glass-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flex: 1,
              resize: "none",
              fontFamily: "var(--font-mono)",
              fontSize: "14px",
              padding: "16px",
              lineHeight: 1.5,
              whiteSpace: "pre",
            }}
            placeholder="SELECT * FROM users WHERE id=1;"
            spellCheck={false}
          />
        </div>

        <div className="glass-card" style={{ padding: "16px", display: "flex", flexDirection: "column", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontWeight: 600, color: "#f1f5f9", fontSize: "14px" }}>
              Formatted Query
            </span>
            <button className="btn-ghost" onClick={handleCopy} disabled={!output} style={{ padding: "4px 8px", fontSize: "12px" }}>
              {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          
          {error ? (
            <div style={{ color: "#ef4444", backgroundColor: "#ef444415", padding: "12px", borderRadius: "8px", fontSize: "13px", fontFamily: "var(--font-mono)" }}>
              {error}
            </div>
          ) : (
            <textarea
              className="glass-input"
              value={output}
              readOnly
              style={{
                flex: 1,
                resize: "none",
                fontFamily: "var(--font-mono)",
                fontSize: "14px",
                padding: "16px",
                lineHeight: 1.5,
                whiteSpace: "pre",
                backgroundColor: "rgba(255,255,255,0.02)",
                color: "#6ee7b7"
              }}
              placeholder="Formatted output will appear here..."
              spellCheck={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}
