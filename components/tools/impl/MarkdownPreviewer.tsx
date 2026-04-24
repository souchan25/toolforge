"use client";
import { useState, useMemo } from "react";
import { Copy, Check, Download } from "lucide-react";
import { marked } from "marked";

const DEFAULT_MD = `# Welcome to Markdown Previewer

Write **Markdown** on the left, see the rendered preview on the right.

## Features

- Live preview as you type
- GitHub Flavored Markdown (GFM)
- Tables, code blocks, and more

\`\`\`javascript
const hello = "world";
console.log(hello);
\`\`\`

> Blockquotes work too!

| Column A | Column B |
|----------|----------|
| Value 1  | Value 2  |
`;

export function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState(DEFAULT_MD);
  const [copied, setCopied] = useState(false);

  const html = useMemo(() => {
    marked.setOptions({ gfm: true, breaks: true });
    return marked.parse(markdown) as string;
  }, [markdown]);

  const copy = () => {
 navigator.clipboard.writeText(markdown); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const downloadHtml = () => {
    const full = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Export</title></head><body>${html}</body></html>`;
    const blob = new Blob([full], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "export.html"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
        <button className="btn-icon" onClick={copy} title="Copy Markdown" style={{ color: copied ? "#10b981" : undefined }}>{copied ? <Check size={15} /> : <Copy size={15} />}</button>
        <button className="btn-ghost" onClick={downloadHtml} style={{ gap: "6px", fontSize: "13px", padding: "7px 14px" }}><Download size={14} /> Export HTML</button>
      </div>

      <div className="tool-two-col" style={{ minHeight: "500px" }}>
        {/* Editor */}
        <div className="glass-card-static" style={{ borderRadius: "12px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#94a3b8" }}>Markdown</span>
          </div>
          <textarea
            className="glass-input"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            style={{ border: "none", borderRadius: 0, flex: 1, minHeight: "460px", resize: "none" }}
          />
        </div>

        {/* Preview */}
        <div className="glass-card-static" style={{ borderRadius: "12px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#94a3b8" }}>Preview</span>
          </div>
          <div
            className="markdown-preview"
            style={{ padding: "16px", flex: 1, overflowY: "auto" }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  );
}
