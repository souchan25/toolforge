"use client";

import { useState } from "react";
import { Copy, Check, ArrowRightLeft } from "lucide-react";
import YAML from "yaml";

export function YamlToJson() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"yaml2json" | "json2yaml">("yaml2json");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }

    try {
      if (mode === "yaml2json") {
        const parsed = YAML.parse(input);
        setOutput(JSON.stringify(parsed, null, 2));
      } else {
        const parsed = JSON.parse(input);
        setOutput(YAML.stringify(parsed));
      }
      setError(null);
    } catch (err: any) {
      setError(err.message || "Invalid input format");
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwap = () => {
    setMode((prev) => (prev === "yaml2json" ? "json2yaml" : "yaml2json"));
    setInput(output);
    setOutput("");
    setError(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button className="btn-ghost" onClick={handleSwap} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ArrowRightLeft size={16} />
          Swap Direction ({mode === "yaml2json" ? "YAML to JSON" : "JSON to YAML"})
        </button>
        <button className="btn-primary" onClick={handleConvert}>
          Convert
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", minHeight: "400px" }}>
        <div className="glass-card" style={{ padding: "16px", display: "flex", flexDirection: "column" }}>
          <div style={{ marginBottom: "12px", fontWeight: 600, color: "#f1f5f9", fontSize: "14px" }}>
            Input ({mode === "yaml2json" ? "YAML" : "JSON"})
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
            placeholder={mode === "yaml2json" ? "key: value\nnested:\n  item: 123" : '{\n  "key": "value",\n  "nested": {\n    "item": 123\n  }\n}'}
            spellCheck={false}
          />
        </div>

        <div className="glass-card" style={{ padding: "16px", display: "flex", flexDirection: "column", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontWeight: 600, color: "#f1f5f9", fontSize: "14px" }}>
              Output ({mode === "yaml2json" ? "JSON" : "YAML"})
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
              placeholder="Output will appear here..."
              spellCheck={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}
