"use client";
import { useState } from "react";
import { Copy, Check, Play } from "lucide-react";
import md5 from "md5";

type Algorithm = "MD5" | "SHA-1" | "SHA-256" | "SHA-512";

async function computeHash(text: string, algo: Algorithm): Promise<string> {
  if (algo === "MD5") return md5(text);
  const buffer = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest(algo.replace("-", "-"), buffer);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<Algorithm, string>>({ "MD5": "", "SHA-1": "", "SHA-256": "", "SHA-512": "" });
  const [copied, setCopied] = useState<string | null>(null);

  const generate = async () => {
    if (!input.trim()) return;
    const results: Record<string, string> = {};
    for (const algo of ["MD5", "SHA-1", "SHA-256", "SHA-512"] as Algorithm[]) {
      results[algo] = await computeHash(input, algo);
    }
    setHashes(results as Record<Algorithm, string>);
  };

  const copy = (val: string) => { navigator.clipboard.writeText(val); setCopied(val); setTimeout(() => setCopied(null), 2000); };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div className="glass-card-static" style={{ borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#94a3b8" }}>Input Text</span>
        </div>
        <textarea className="glass-input glass-input-text" value={input} onChange={(e) => setInput(e.target.value)} rows={5} placeholder="Enter text to hash…" style={{ border: "none", borderRadius: 0 }} />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="btn-primary" onClick={generate} style={{ gap: "6px" }}><Play size={14} /> Generate Hashes</button>
      </div>
      {(["MD5", "SHA-1", "SHA-256", "SHA-512"] as Algorithm[]).map((algo) => (
        <div key={algo} className="glass-card-static" style={{ borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: 600, color: "#818cf8" }}>{algo}</span>
            {hashes[algo] && <button className="btn-icon" onClick={() => copy(hashes[algo])} style={{ color: copied === hashes[algo] ? "#10b981" : undefined }}>{copied === hashes[algo] ? <Check size={15} /> : <Copy size={15} />}</button>}
          </div>
          <div style={{ padding: "12px 16px", fontFamily: "var(--font-mono)", fontSize: "13px", color: "#94a3b8", wordBreak: "break-all", minHeight: "40px" }}>
            {hashes[algo] || <span style={{ color: "#475569" }}>—</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
