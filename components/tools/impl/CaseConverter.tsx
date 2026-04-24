"use client";
import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";

type CaseType = "upper" | "lower" | "title" | "sentence" | "camel" | "pascal" | "snake" | "kebab";

const CASES: { id: CaseType; label: string }[] = [
  { id: "upper", label: "UPPERCASE" },
  { id: "lower", label: "lowercase" },
  { id: "title", label: "Title Case" },
  { id: "sentence", label: "Sentence case" },
  { id: "camel", label: "camelCase" },
  { id: "pascal", label: "PascalCase" },
  { id: "snake", label: "snake_case" },
  { id: "kebab", label: "kebab-case" },
];

function convertCase(text: string, type: CaseType): string {
  if (!text) return "";
  const words = text.trim().replace(/[\W_]+/g, " ").split(/\s+/).filter(Boolean);
  switch (type) {
    case "upper": return text.toUpperCase();
    case "lower": return text.toLowerCase();
    case "title": return text.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());
    case "sentence": return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    case "camel": return words.map((w, i) => i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase()).join("");
    case "pascal": return words.map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase()).join("");
    case "snake": return words.map((w) => w.toLowerCase()).join("_");
    case "kebab": return words.map((w) => w.toLowerCase()).join("-");
  }
}

export function CaseConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [activeCase, setActiveCase] = useState<CaseType>("title");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setOutput(convertCase(input, activeCase));
  }, [input, activeCase]);

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Case buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {CASES.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCase(c.id)}
            style={{
              padding: "7px 16px",
              borderRadius: "8px",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              fontWeight: 600,
              border: `1px solid ${activeCase === c.id ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.1)"}`,
              background: activeCase === c.id ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.04)",
              color: activeCase === c.id ? "#818cf8" : "#94a3b8",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="glass-card-static" style={{ borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <label style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#94a3b8" }}>Input</label>
        </div>
        <textarea className="glass-input glass-input-text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type or paste your text…" rows={5} style={{ border: "none", borderRadius: 0 }} />
      </div>

      {/* Output */}
      <div className="glass-card-static" style={{ borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <label style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#94a3b8" }}>Output — {CASES.find((c) => c.id === activeCase)?.label}</label>
          <button className="btn-icon" onClick={copy} style={{ color: copied ? "#10b981" : undefined }}>
            {copied ? <Check size={15} /> : <Copy size={15} />}
          </button>
        </div>
        <textarea className="glass-input glass-input-text" value={output} readOnly rows={5} style={{ border: "none", borderRadius: 0 }} />
      </div>
    </div>
  );
}
