"use client";
// components/layout/Footer.tsx
import Link from "next/link";
import { Zap } from "lucide-react";

const links = [
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "48px 32px",
        marginTop: "80px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "32px", justifyContent: "space-between", alignItems: "flex-start" }}>
          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "280px" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  borderRadius: "7px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Zap size={15} color="#fff" />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "16px",
                  background: "linear-gradient(90deg, #f1f5f9, #818cf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                ToolForge
              </span>
            </Link>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#475569", lineHeight: 1.6 }}>
              Free, browser-based developer utilities. No login, no tracking — just tools that work.
            </p>
          </div>

          {/* Links */}
          <nav style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
                Navigation
              </div>
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "14px", color: "#94a3b8", textDecoration: "none", marginBottom: "8px", transition: "color 0.2s" }}
                  className="footer-link"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
                Popular Tools
              </div>
              {[
                { href: "/tools/json-formatter", label: "JSON Formatter" },
                { href: "/tools/regex-tester", label: "Regex Tester" },
                { href: "/tools/base64", label: "Base64" },
                { href: "/tools/color-picker", label: "Color Picker" },
                { href: "/tools/uuid-generator", label: "UUID Generator" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "14px", color: "#94a3b8", textDecoration: "none", marginBottom: "8px", transition: "color 0.2s" }}
                  className="footer-link"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#475569" }}>
            © {new Date().getFullYear()} ToolForge. All tools run in your browser.
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#475569" }}>
            Made for developers, by developers ⚡
          </p>
        </div>
      </div>
    </footer>
  );
}
