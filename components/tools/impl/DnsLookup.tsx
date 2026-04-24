"use client";

import { useState, useEffect } from "react";
import { Search, Globe, MapPin, Network } from "lucide-react";

interface DnsRecord {
  name: string;
  type: number;
  TTL: number;
  data: string;
}

interface IpInfo {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  org: string;
}

const RECORD_TYPES: Record<number, string> = {
  1: "A",
  2: "NS",
  5: "CNAME",
  15: "MX",
  16: "TXT",
  28: "AAAA",
};

export function DnsLookup() {
  const [domain, setDomain] = useState("");
  const [recordType, setRecordType] = useState<string>("ANY");
  const [records, setRecords] = useState<DnsRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);

  useEffect(() => {
    // Fetch user IP info on mount
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data.ip) setIpInfo(data);
      })
      .catch(() => console.error("Failed to fetch IP info"));
  }, []);

  const handleLookup = async () => {
    if (!domain.trim()) return;
    setLoading(true);
    setError(null);
    setRecords([]);

    try {
      let typesToFetch = [recordType];
      if (recordType === "ANY") {
        typesToFetch = ["A", "AAAA", "MX", "TXT", "CNAME", "NS"];
      }

      let allRecords: DnsRecord[] = [];

      for (const t of typesToFetch) {
        const res = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=${t}`);
        const data = await res.json();
        
        if (data.Answer) {
          allRecords = [...allRecords, ...data.Answer];
        }
      }

      if (allRecords.length === 0) {
        setError("No records found for this domain.");
      } else {
        setRecords(allRecords);
      }
    } catch (err: any) {
      setError(err.message || "Failed to perform lookup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* My IP Section */}
      <div className="glass-card" style={{ padding: "20px", display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Network size={24} color="#10b981" />
        </div>
        <div>
          <h3 style={{ fontSize: "14px", color: "#94a3b8", fontWeight: 500, marginBottom: "4px" }}>Your Public IP Address</h3>
          <div style={{ fontSize: "20px", fontWeight: 700, color: "#f1f5f9", fontFamily: "var(--font-mono)" }}>
            {ipInfo ? ipInfo.ip : "Loading..."}
          </div>
          {ipInfo && (
            <div style={{ fontSize: "13px", color: "#64748b", marginTop: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
              <MapPin size={12} /> {ipInfo.city}, {ipInfo.country_name} — {ipInfo.org}
            </div>
          )}
        </div>
      </div>

      {/* DNS Lookup Section */}
      <div className="glass-card" style={{ padding: "24px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#f1f5f9", marginBottom: "16px" }}>DNS Record Lookup</h3>
        
        <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <Globe size={18} color="#64748b" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
            <input
              type="text"
              className="glass-input"
              placeholder="example.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              style={{ paddingLeft: "40px", width: "100%" }}
              onKeyDown={(e) => e.key === "Enter" && handleLookup()}
            />
          </div>
          <select 
            className="glass-input" 
            value={recordType} 
            onChange={(e) => setRecordType(e.target.value)}
            style={{ width: "120px", appearance: "auto" }}
          >
            <option value="ANY">Any</option>
            <option value="A">A</option>
            <option value="AAAA">AAAA</option>
            <option value="MX">MX</option>
            <option value="TXT">TXT</option>
            <option value="CNAME">CNAME</option>
            <option value="NS">NS</option>
          </select>
          <button className="btn-primary" onClick={handleLookup} disabled={loading} style={{ minWidth: "100px" }}>
            {loading ? "Searching..." : <><Search size={16} /> Lookup</>}
          </button>
        </div>

        {error && (
          <div style={{ padding: "16px", color: "#ef4444", backgroundColor: "#ef444415", borderRadius: "8px", fontSize: "14px", textAlign: "center" }}>
            {error}
          </div>
        )}

        {records.length > 0 && (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8" }}>
                  <th style={{ padding: "12px 16px", fontWeight: 600 }}>Type</th>
                  <th style={{ padding: "12px 16px", fontWeight: 600 }}>Name</th>
                  <th style={{ padding: "12px 16px", fontWeight: 600 }}>Data</th>
                  <th style={{ padding: "12px 16px", fontWeight: 600 }}>TTL</th>
                </tr>
              </thead>
              <tbody>
                {records.map((rec, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#f1f5f9" }}>
                    <td style={{ padding: "12px 16px", fontWeight: 600, color: "#818cf8" }}>
                      {RECORD_TYPES[rec.type] || rec.type}
                    </td>
                    <td style={{ padding: "12px 16px" }}>{rec.name}</td>
                    <td style={{ padding: "12px 16px", fontFamily: "var(--font-mono)", wordBreak: "break-all" }}>{rec.data}</td>
                    <td style={{ padding: "12px 16px", color: "#94a3b8" }}>{rec.TTL}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
