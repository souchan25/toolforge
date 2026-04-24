// app/privacy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ToolForge privacy policy — all tools run in your browser, we collect no personal data.",
};

export default function PrivacyPage() {
  const sections = [
    { title: "Data Collection", body: "ToolForge does not collect, transmit, or store any personal data. All tool processing happens entirely within your browser. We have no backend database." },
    { title: "Cookies", body: "We do not use tracking cookies. We may use anonymous analytics (e.g. page views) in the future, but no personally identifiable data will ever be collected." },
    { title: "Third-Party Services", body: "We use Google Fonts (loaded from Google CDN) and no other third-party APIs that process your data." },
    { title: "Your Data", body: "Since all computation happens in your browser, any data you paste into our tools is never seen by us. Refreshing the page clears all inputs." },
    { title: "Changes", body: "We may update this policy occasionally. Continued use of ToolForge after changes indicates acceptance of the updated policy." },
  ];

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto", padding: "64px 24px 80px" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em", marginBottom: "12px" }}>Privacy Policy</h1>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#475569", marginBottom: "48px" }}>Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {sections.map((s) => (
          <div key={s.title} className="glass-card-static" style={{ padding: "24px 28px", borderRadius: "12px" }}>
            <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "17px", fontWeight: 700, color: "#f1f5f9", marginBottom: "10px" }}>{s.title}</h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#94a3b8", lineHeight: 1.8, margin: 0 }}>{s.body}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "40px", padding: "20px 24px", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "12px" }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#10b981", margin: 0 }}>
          <strong>TL;DR:</strong> We don&apos;t collect or see your data. Everything runs locally in your browser. No account, no tracking.
        </p>
      </div>
    </div>
  );
}
