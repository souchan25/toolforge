"use client";
import { useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";

const LOREM_WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip commodo consequat duis aute irure dolor reprehenderit voluptate velit esse cillum dolore fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum".split(" ");

function randomWord() { return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]; }

function generateWords(n: number) {
  return Array.from({ length: n }, (_, i) => {
    const w = randomWord();
    return i === 0 ? w[0].toUpperCase() + w.slice(1) : w;
  }).join(" ") + ".";
}

function generateSentence() {
  const len = 8 + Math.floor(Math.random() * 10);
  return generateWords(len);
}

function generateParagraph() {
  const len = 4 + Math.floor(Math.random() * 4);
  return Array.from({ length: len }, generateSentence).join(" ");
}

export function LoremIpsum() {
  const [amount, setAmount] = useState(3);
  const [unit, setUnit] = useState<"words" | "sentences" | "paragraphs">("paragraphs");
  const [classic, setClassic] = useState(true);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let result = "";
    if (unit === "words") result = generateWords(amount);
    else if (unit === "sentences") result = Array.from({ length: amount }, generateSentence).join(" ");
    else result = Array.from({ length: amount }, generateParagraph).join("\n\n");
    if (classic) result = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + result;
    setOutput(result.trim());
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Controls */}
      <div className="glass-card-static" style={{ borderRadius: "12px", padding: "20px", display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#94a3b8", fontWeight: 600 }}>Amount</label>
          <input
            type="number"
            min={1}
            max={100}
            value={amount}
            onChange={(e) => setAmount(Math.max(1, Number(e.target.value)))}
            className="glass-input glass-input-text"
            style={{ width: "100px", resize: "none" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#94a3b8", fontWeight: 600 }}>Unit</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as typeof unit)}
            className="glass-input glass-input-text"
            style={{ width: "160px", cursor: "pointer" }}
          >
            <option value="words">Words</option>
            <option value="sentences">Sentences</option>
            <option value="paragraphs">Paragraphs</option>
          </select>
        </div>
        <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", userSelect: "none", marginTop: "auto" }}>
          <input type="checkbox" checked={classic} onChange={(e) => setClassic(e.target.checked)} />
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#94a3b8" }}>Start with classic Lorem</span>
        </label>
        <button className="btn-primary" onClick={generate} style={{ marginTop: "auto", gap: "7px" }}>
          <RefreshCw size={14} /> Generate
        </button>
      </div>

      {/* Output */}
      <div className="glass-card-static" style={{ borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <label style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#94a3b8" }}>Generated Text</label>
          <button className="btn-icon" onClick={copy} style={{ color: copied ? "#10b981" : undefined }}>
            {copied ? <Check size={15} /> : <Copy size={15} />}
          </button>
        </div>
        <textarea
          className="glass-input glass-input-text"
          value={output}
          readOnly
          rows={12}
          placeholder="Click Generate to produce text…"
          style={{ border: "none", borderRadius: 0 }}
        />
      </div>
    </div>
  );
}
