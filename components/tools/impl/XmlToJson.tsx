"use client";

import { useState } from "react";
import { Copy, Check, ArrowRightLeft } from "lucide-react";
import { xml2json, json2xml } from "xml-js";

export function XmlToJson() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"xml2json" | "json2xml">("xml2json");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }

    try {
      if (mode === "xml2json") {
        const result = xml2json(input, { compact: true, spaces: 2 });
        setOutput(result);
      } else {
        const result = json2xml(input, { compact: true, spaces: 2 });
        setOutput(result);
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
    setMode((prev) => (prev === "xml2json" ? "json2xml" : "xml2json"));
    setInput(output);
    setOutput("");
    setError(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button className="btn-ghost" onClick={handleSwap} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ArrowRightLeft size={16} />
          Swap Direction ({mode === "xml2json" ? "XML to JSON" : "JSON to XML"})
        </button>
        <button className="btn-primary" onClick={handleConvert}>
          Convert
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", minHeight: "400px" }}>
        <div className="glass-card" style={{ padding: "16px", display: "flex", flexDirection: "column" }}>
          <div style={{ marginBottom: "12px", fontWeight: 600, color: "#f1f5f9", fontSize: "14px" }}>
            Input ({mode === "xml2json" ? "XML" : "JSON"})
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
            placeholder={mode === "xml2json" ? "<root>\n  <item>Value</item>\n</root>" : '{\n  "root": {\n    "item": "Value"\n  }\n}'}
            spellCheck={false}
          />
        </div>

        <div className="glass-card" style={{ padding: "16px", display: "flex", flexDirection: "column", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontWeight: 600, color: "#f1f5f9", fontSize: "14px" }}>
              Output ({mode === "xml2json" ? "JSON" : "XML"})
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
