"use client";
import { useState } from "react";
import { Copy, Check, Play } from "lucide-react";

function formatHtml(html: string, indentSize: number): string {
  const indent = " ".repeat(indentSize);
  let output = "";
  let level = 0;
  const selfClosing = new Set(["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"]);

  const tokens = html
    .replace(/>\s*</g, "><")
    .split(/(<[^>]+>)/g)
    .filter(Boolean);

  for (const token of tokens) {
    if (token.startsWith("</")) {
      level = Math.max(0, level - 1);
      output += indent.repeat(level) + token.trim() + "\n";
    } else if (token.startsWith("<") && !token.startsWith("<!--")) {
      const tag = (token.match(/<([a-zA-Z0-9-]+)/) ?? [])[1]?.toLowerCase() ?? "";
      output += indent.repeat(level) + token.trim() + "\n";
      if (!selfClosing.has(tag) && !token.endsWith("/>")) level++;
    } else if (token.trim()) {
      output += indent.repeat(level) + token.trim() + "\n";
    }
  }
  return output.trim();
}

export function HtmlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState(2);
  const [copied, setCopied] = useState(false);

  const format = () => {
    if (!input.trim()) return;
    setOutput(formatHtml(input, indent));
  };

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#94a3b8" }}>Indent:</label>
          {[2, 4].map((n) => (
            <button key={n} onClick={() => setIndent(n)} style={{ padding: "5px 12px", borderRadius: "7px", fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: 600, border: `1px solid ${indent === n ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.1)"}`, background: indent === n ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.04)", color: indent === n ? "#818cf8" : "#94a3b8", cursor: "pointer" }}>{n} spaces</button>
          ))}
        </div>
        <button className="btn-primary" onClick={format} style={{ marginLeft: "auto", gap: "6px" }}><Play size={14} /> Format HTML</button>
      </div>

      <div className="glass-card-static" style={{ borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#94a3b8" }}>Input HTML</span>
        </div>
        <textarea className="glass-input" value={input} onChange={(e) => setInput(e.target.value)} rows={10} placeholder="<html><head><title>Paste minified HTML here</title></head></html>" style={{ border: "none", borderRadius: 0 }} />
      </div>

      {output && (
        <div className="glass-card-static" style={{ borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#94a3b8" }}>Formatted HTML</span>
            <button className="btn-icon" onClick={copy} style={{ color: copied ? "#10b981" : undefined }}>{copied ? <Check size={15} /> : <Copy size={15} />}</button>
          </div>
          <textarea className="glass-input" value={output} readOnly rows={14} style={{ border: "none", borderRadius: 0 }} />
        </div>
      )}
    </div>
  );
}
