// app/about/page.tsx
import type { Metadata } from "next";
import { Zap, Shield, Code2, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About ToolForge",
  description: "ToolForge is a free, browser-based suite of developer utilities built for speed, privacy, and usability.",
};

export default function AboutPage() {
  const values = [
    { icon: Shield, title: "Privacy First", desc: "Every tool runs 100% in your browser. We never receive, store, or process your data on any server.", color: "#10b981" },
    { icon: Zap, title: "Instant Results", desc: "No server round trips. Results appear instantly as you type or click — optimized for developer workflows.", color: "#6366f1" },
    { icon: Code2, title: "Built for Devs", desc: "Designed by developers who needed these tools every day. Every UX decision prioritizes the developer experience.", color: "#8b5cf6" },
    { icon: Heart, title: "Always Free", desc: "No subscriptions, tokens, or hidden costs. ToolForge is and will always be free to use.", color: "#f43f5e" },
  ];

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "64px 24px 80px" }}>
      <div style={{ textAlign: "center", marginBottom: "64px" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.03em", marginBottom: "20px" }}>
          About ToolForge
        </h1>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "18px", color: "#94a3b8", lineHeight: 1.7, maxWidth: "600px", margin: "0 auto" }}>
          ToolForge is a free, privacy-focused suite of developer utilities. 21 tools, zero logins, zero server calls.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px", marginBottom: "64px" }}>
        {values.map((v) => (
          <div key={v.title} className="glass-card-static" style={{ padding: "28px", borderRadius: "16px" }}>
            <div style={{ width: "48px", height: "48px", background: `${v.color}18`, border: `1px solid ${v.color}40`, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
              <v.icon size={24} color={v.color} />
            </div>
            <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "17px", fontWeight: 700, color: "#f1f5f9", marginBottom: "8px" }}>{v.title}</h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#94a3b8", lineHeight: 1.7 }}>{v.desc}</p>
          </div>
        ))}
      </div>

      <div className="glass-card-static" style={{ padding: "40px", borderRadius: "16px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 700, color: "#f1f5f9", marginBottom: "16px" }}>The Mission</h2>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "16px", color: "#94a3b8", lineHeight: 1.8, maxWidth: "600px", margin: "0 auto" }}>
          Developers deserve tools that respect their time and data. ToolForge is our answer — a premium-feeling, glassmorphic toolkit that just works, offline, instantly, for free. No paywalls in sight.
        </p>
      </div>
    </div>
  );
}
