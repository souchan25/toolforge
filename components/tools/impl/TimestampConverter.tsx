"use client";
import { useState } from "react";
import { Copy, Check, Clock } from "lucide-react";

export function TimestampConverter() {
  const [ts, setTs] = useState("");
  const [date, setDate] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (val: string) => { navigator.clipboard.writeText(val); setCopied(val); setTimeout(() => setCopied(null), 2000); };

  const now = () => {
    const n = Math.floor(Date.now() / 1000);
    setTs(String(n));
    convertTs(String(n));
  };

  const convertTs = (val: string) => {
    setTs(val);
    const n = Number(val);
    if (!isNaN(n) && val.trim()) {
      const ms = val.length <= 10 ? n * 1000 : n;
      setDate(new Date(ms).toISOString());
    } else {
      setDate("");
    }
  };

  const convertDate = (val: string) => {
    setDate(val);
    if (val.trim()) {
      const d = new Date(val);
      if (!isNaN(d.getTime())) {
        setTs(String(Math.floor(d.getTime() / 1000)));
      }
    }
  };

  const tsNum = Number(ts);
  const ms = ts.length <= 10 ? tsNum * 1000 : tsNum;
  const parsed = ts && !isNaN(tsNum) ? new Date(ms) : null;

  const rows = parsed
    ? [
        { label: "Unix (seconds)", value: String(Math.floor(ms / 1000)) },
        { label: "Unix (milliseconds)", value: String(ms) },
        { label: "ISO 8601", value: parsed.toISOString() },
        { label: "UTC", value: parsed.toUTCString() },
        { label: "Local Time", value: parsed.toLocaleString() },
        { label: "Date Only (UTC)", value: parsed.toISOString().split("T")[0] },
      ]
    : [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div className="tool-two-col">
        {/* Unix timestamp */}
        <div className="glass-card-static" style={{ borderRadius: "12px", padding: "16px" }}>
          <label style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#94a3b8", fontWeight: 600, marginBottom: "10px", display: "block" }}>Unix Timestamp</label>
          <div style={{ display: "flex", gap: "8px" }}>
            <input className="glass-input glass-input-text" value={ts} onChange={(e) => convertTs(e.target.value)} placeholder="1700000000" />
            <button className="btn-icon" onClick={now} title="Use current time"><Clock size={15} /></button>
          </div>
        </div>

        {/* ISO date */}
        <div className="glass-card-static" style={{ borderRadius: "12px", padding: "16px" }}>
          <label style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#94a3b8", fontWeight: 600, marginBottom: "10px", display: "block" }}>Date / Time</label>
          <input className="glass-input glass-input-text" value={date} onChange={(e) => convertDate(e.target.value)} placeholder="2024-11-15T00:00:00.000Z" />
        </div>
      </div>

      {rows.length > 0 && (
        <div className="glass-card-static" style={{ borderRadius: "12px", overflow: "hidden" }}>
          {rows.map((r) => (
            <div key={r.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.04)", gap: "12px" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#94a3b8", minWidth: "180px" }}>{r.label}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "#f1f5f9", flex: 1 }}>{r.value}</span>
              <button className="btn-icon" onClick={() => copy(r.value)} style={{ color: copied === r.value ? "#10b981" : undefined, flexShrink: 0 }}>
                {copied === r.value ? <Check size={13} /> : <Copy size={13} />}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
