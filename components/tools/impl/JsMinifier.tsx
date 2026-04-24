"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function JsMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleMinify = () => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }

    try {
      // Basic regex-based minifier for JS
      // 1. Remove single-line comments
      // 2. Remove multi-line comments
      // 3. Remove unnecessary whitespace
      let minified = input
        .replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, "$1") // comments
        .replace(/\s+/g, " ") // compress whitespace
        .replace(/\s*([=+\-*/%<>!&|{}()[\];:,?])\s*/g, "$1") // spaces around operators
        .trim();

      setOutput(minified);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Minification failed");
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
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="btn-primary" onClick={handleMinify}>
          Minify Code
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", minHeight: "400px" }}>
        <div className="glass-card" style={{ padding: "16px", display: "flex", flexDirection: "column" }}>
          <div style={{ marginBottom: "12px", fontWeight: 600, color: "#f1f5f9", fontSize: "14px" }}>
            JavaScript / TypeScript Input
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
            placeholder="function greet(name) {\n  // Print greeting\n  console.log('Hello ' + name);\n}"
            spellCheck={false}
          />
        </div>

        <div className="glass-card" style={{ padding: "16px", display: "flex", flexDirection: "column", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontWeight: 600, color: "#f1f5f9", fontSize: "14px" }}>
              Minified Output
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
              }}
              placeholder="function greet(a){console.log('Hello '+a)}"
              spellCheck={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}
