"use client";

import { useState, useEffect } from "react";
import { Copy, Check, CalendarClock } from "lucide-react";
import cronstrue from "cronstrue";

export function CronGenerator() {
  const [minute, setMinute] = useState("*");
  const [hour, setHour] = useState("*");
  const [dayOfMonth, setDayOfMonth] = useState("*");
  const [month, setMonth] = useState("*");
  const [dayOfWeek, setDayOfWeek] = useState("*");
  
  const [cronString, setCronString] = useState("* * * * *");
  const [description, setDescription] = useState("Every minute");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const newCron = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
    setCronString(newCron);
    try {
      const desc = cronstrue.toString(newCron, { throwExceptionOnParseError: true });
      setDescription(desc);
      setError(null);
    } catch (err: any) {
      setDescription("");
      setError(err.toString());
    }
  }, [minute, hour, dayOfMonth, month, dayOfWeek]);

  const handleCopy = () => {
    navigator.clipboard.writeText(cronString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Output Display */}
      <div className="glass-card" style={{ padding: "32px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <CalendarClock size={28} color="#06b6d4" />
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#f1f5f9", fontFamily: "var(--font-mono)", letterSpacing: "0.1em" }}>
            {cronString}
          </h2>
        </div>
        
        {error ? (
          <div style={{ color: "#ef4444", fontSize: "16px", fontWeight: 500 }}>{error}</div>
        ) : (
          <div style={{ color: "#06b6d4", fontSize: "18px", fontWeight: 600 }}>{description}</div>
        )}
        
        <button className="btn-primary" onClick={handleCopy} style={{ marginTop: "8px" }}>
          {copied ? <><Check size={16} /> Copied</> : <><Copy size={16} /> Copy Expression</>}
        </button>
      </div>

      {/* Controls Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
        <ControlBox label="Minute (0-59)" value={minute} onChange={setMinute} options={[
          { label: "Every minute (*)", value: "*" },
          { label: "Every 5 minutes (*/5)", value: "*/5" },
          { label: "Every 15 minutes (*/15)", value: "*/15" },
          { label: "Every 30 minutes (*/30)", value: "*/30" },
          { label: "At minute 0 (0)", value: "0" }
        ]} />
        <ControlBox label="Hour (0-23)" value={hour} onChange={setHour} options={[
          { label: "Every hour (*)", value: "*" },
          { label: "Every 2 hours (*/2)", value: "*/2" },
          { label: "Every 6 hours (*/6)", value: "*/6" },
          { label: "At midnight (0)", value: "0" },
          { label: "At noon (12)", value: "12" }
        ]} />
        <ControlBox label="Day of Month (1-31)" value={dayOfMonth} onChange={setDayOfMonth} options={[
          { label: "Every day (*)", value: "*" },
          { label: "1st of month (1)", value: "1" },
          { label: "15th of month (15)", value: "15" },
          { label: "Last day (L)", value: "L" } // standard cron doesn't always support L, but cronstrue might
        ]} />
        <ControlBox label="Month (1-12)" value={month} onChange={setMonth} options={[
          { label: "Every month (*)", value: "*" },
          { label: "January (1)", value: "1" },
          { label: "June (6)", value: "6" },
          { label: "December (12)", value: "12" }
        ]} />
        <ControlBox label="Day of Week (0-6)" value={dayOfWeek} onChange={setDayOfWeek} options={[
          { label: "Every day (*)", value: "*" },
          { label: "Sunday (0)", value: "0" },
          { label: "Monday-Friday (1-5)", value: "1-5" },
          { label: "Weekend (0,6)", value: "0,6" }
        ]} />
      </div>
    </div>
  );
}

function ControlBox({ label, value, onChange, options }: { label: string, value: string, onChange: (v: string) => void, options: {label: string, value: string}[] }) {
  return (
    <div className="glass-card" style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
      <label style={{ fontSize: "14px", fontWeight: 600, color: "#f1f5f9" }}>{label}</label>
      <input
        type="text"
        className="glass-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ fontFamily: "var(--font-mono)", fontSize: "14px" }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "8px" }}>
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              textAlign: "left",
              padding: "6px 8px",
              background: value === opt.value ? "rgba(6, 182, 212, 0.1)" : "transparent",
              color: value === opt.value ? "#06b6d4" : "#94a3b8",
              border: "1px solid",
              borderColor: value === opt.value ? "rgba(6, 182, 212, 0.3)" : "transparent",
              borderRadius: "6px",
              fontSize: "12px",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
