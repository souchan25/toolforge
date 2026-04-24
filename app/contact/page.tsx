// app/contact/page.tsx
"use client";
import { useState } from "react";
import { Mail, Send } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div style={{ maxWidth: "640px", margin: "0 auto", padding: "64px 24px 80px" }}>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <div style={{ width: "60px", height: "60px", background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <Mail size={28} color="#818cf8" />
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em", marginBottom: "12px" }}>Contact Us</h1>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "16px", color: "#94a3b8", lineHeight: 1.7 }}>
          Have a tool idea, found a bug, or just want to say hi? We&apos;d love to hear from you.
        </p>
      </div>

      {!sent ? (
        <form onSubmit={handleSubmit} className="glass-card-static" style={{ borderRadius: "16px", padding: "32px", display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#94a3b8" }}>Name</label>
            <input className="glass-input glass-input-text" placeholder="Your name" required />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#94a3b8" }}>Email</label>
            <input className="glass-input glass-input-text" type="email" placeholder="you@example.com" required />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#94a3b8" }}>Subject</label>
            <input className="glass-input glass-input-text" placeholder="Tool idea / Bug report / Other" required />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#94a3b8" }}>Message</label>
            <textarea className="glass-input glass-input-text" rows={6} placeholder="Tell us what's on your mind…" required />
          </div>
          <button type="submit" className="btn-primary" style={{ gap: "8px" }}>
            <Send size={15} /> Send Message
          </button>
        </form>
      ) : (
        <div className="glass-card-static" style={{ borderRadius: "16px", padding: "48px", textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>✓</div>
          <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "22px", fontWeight: 700, color: "#10b981", marginBottom: "8px" }}>Message Sent!</h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "#94a3b8" }}>Thanks for reaching out. We&apos;ll get back to you soon.</p>
        </div>
      )}
    </div>
  );
}
