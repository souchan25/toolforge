"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

function generateTypescriptInterfaces(jsonString: string): string {
  try {
    const obj = JSON.parse(jsonString);
    let interfaces: string[] = [];
    
    function getType(val: any, interfaceName: string): string {
      if (val === null) return "null";
      if (Array.isArray(val)) {
        if (val.length === 0) return "any[]";
        const itemType = getType(val[0], interfaceName + "Item");
        return `${itemType}[]`;
      }
      if (typeof val === "object") {
        let props = Object.entries(val).map(([k, v]) => {
          const propName = k.includes("-") || k.includes(" ") ? `"${k}"` : k;
          return `  ${propName}: ${getType(v, interfaceName + "_" + k)};`;
        });
        const interfaceDecl = `export interface ${interfaceName} {\n${props.join("\n")}\n}`;
        interfaces.push(interfaceDecl);
        return interfaceName;
      }
      return typeof val;
    }
    
    getType(obj, "RootObject");
    return interfaces.reverse().join("\n\n");
  } catch (e: any) {
    throw new Error("Invalid JSON: " + e.message);
  }
}

export function JsonToTs() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }
    try {
      const ts = generateTypescriptInterfaces(input);
      setOutput(ts);
      setError(null);
    } catch (err: any) {
      setError(err.message);
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
        <button className="btn-primary" onClick={handleConvert}>
          Generate TypeScript
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", minHeight: "400px" }}>
        <div className="glass-card" style={{ padding: "16px", display: "flex", flexDirection: "column" }}>
          <div style={{ marginBottom: "12px", fontWeight: 600, color: "#f1f5f9", fontSize: "14px" }}>
            JSON Input
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
            placeholder='{\n  "user": {\n    "id": 1,\n    "name": "Alice"\n  }\n}'
            spellCheck={false}
          />
        </div>

        <div className="glass-card" style={{ padding: "16px", display: "flex", flexDirection: "column", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontWeight: 600, color: "#f1f5f9", fontSize: "14px" }}>
              TypeScript Interfaces
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
                color: "#818cf8"
              }}
              placeholder="export interface RootObject { ... }"
              spellCheck={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}
