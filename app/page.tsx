// app/page.tsx — Landing Page
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap, Code2, Palette, Hash, Braces, AlignLeft, Shield, GitBranch } from "lucide-react";
import { TOOLS, type ToolCategory } from "@/lib/tools/registry";
import { getToolIcon } from "@/lib/tools/icons";

export const metadata: Metadata = {
  title: "ToolForge — Developer Tools, Forged to Perfection",
  description: "21+ free browser-based developer utilities. JSON formatter, Regex tester, Base64 encoder, CSS generators, color tools, and more. No login required.",
};

const FEATURE_HIGHLIGHTS = [
  {
    icon: Shield,
    title: "100% Browser-Based",
    description: "Everything runs locally. Your data never leaves your machine.",
    color: "#10b981",
  },
  {
    icon: Zap,
    title: "Blazing Fast",
    description: "Instant results with zero server round trips.",
    color: "#6366f1",
  },
  {
    icon: Code2,
    title: "21+ Tools",
    description: "Text, JSON, CSS, Color, Dev Utils, and Code tools all in one place.",
    color: "#8b5cf6",
  },
  {
    icon: GitBranch,
    title: "Always Free",
    description: "No subscriptions, no paywalls, no account needed ever.",
    color: "#0891b2",
  },
];

const STATS = [
  { value: "21+", label: "Developer Tools" },
  { value: "6", label: "Tool Categories" },
  { value: "100%", label: "Browser-Based" },
  { value: "0", label: "Logins Required" },
];

const PREVIEW_TOOLS = TOOLS.filter((t) => t.badge === "popular").slice(0, 6);

const CATEGORIES: { key: ToolCategory; label: string; icon: typeof Code2; color: string }[] = [
  { key: "text", label: "Text Tools", icon: AlignLeft, color: "#10b981" },
  { key: "json", label: "JSON Tools", icon: Braces, color: "#6366f1" },
  { key: "css", label: "CSS Tools", icon: Palette, color: "#8b5cf6" },
  { key: "color", label: "Color Tools", icon: Palette, color: "#f59e0b" },
  { key: "devutils", label: "Dev Utils", icon: Hash, color: "#0891b2" },
  { key: "code", label: "Code Tools", icon: Code2, color: "#f43f5e" },
];

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* ── Hero ── */}
      <section
        style={{
          minHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "80px 24px 60px",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 16px",
            borderRadius: "999px",
            background: "rgba(99,102,241,0.12)",
            border: "1px solid rgba(99,102,241,0.3)",
            marginBottom: "32px",
          }}
          className="animate-fadeInUp"
        >
          <Zap size={14} color="#818cf8" />
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#818cf8" }}>
            21+ Free Developer Tools — No Login Required
          </span>
        </div>

        {/* Headline */}
        <h1
          className="animate-fadeInUp"
          style={{
            color: "var(--color-text-primary)",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(42px, 7vw, 72px)",
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            maxWidth: "900px",
            marginBottom: "24px",
            animationDelay: "0.1s",
          }}
        >
          Developer Tools,{" "}
          <br />
          <span style={{ color: "var(--color-primary-light)" }}>
            Forged to Perfection.
          </span>
        </h1>

        {/* Subheading */}
        <p
          className="animate-fadeInUp"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(16px, 2.5vw, 20px)",
            color: "#94a3b8",
            maxWidth: "600px",
            lineHeight: 1.7,
            marginBottom: "40px",
            animationDelay: "0.2s",
          }}
        >
          A premium suite of browser-based utilities for developers. Format, convert, generate, and debug — all offline, all instant, all free.
        </p>

        {/* CTAs */}
        <div
          className="animate-fadeInUp"
          style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center", animationDelay: "0.3s" }}
        >
          <Link href="/tools" className="btn-primary" style={{ fontSize: "15px", padding: "13px 28px", gap: "8px" }}>
            Browse All Tools <ArrowRight size={16} />
          </Link>
          <Link href="/about" className="btn-ghost" style={{ fontSize: "15px", padding: "13px 28px" }}>
            Learn More
          </Link>
        </div>

        {/* Stats row */}
        <div
          className="animate-fadeInUp"
          style={{
            display: "flex",
            gap: "32px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "64px",
            animationDelay: "0.4s",
          }}
        >
          {STATS.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: 800, color: "#f1f5f9", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#475569", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Popular Tool Cards ── */}
      <section style={{ padding: "0 24px 80px", maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.02em", marginBottom: "12px" }}>
            Popular Tools
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "16px", color: "#94a3b8" }}>
            Start with the most-used developer utilities in the suite.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {PREVIEW_TOOLS.map((tool, i) => {
            const ToolIcon = getToolIcon(tool.icon);
            return (
            <Link
              key={tool.id}
              href={`/tools/${tool.slug}`}
              style={{ textDecoration: "none" }}
            >
              <div
                className="glass-card"
                style={{ padding: "24px", height: "100%", display: "flex", flexDirection: "column", gap: "12px", animationDelay: `${i * 0.07}s` }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      background: "rgba(99,102,241,0.15)",
                      border: "1px solid rgba(99,102,241,0.3)",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <ToolIcon size={22} color="#818cf8" />
                  </div>
                  {tool.badge && (
                    <span className={`badge badge-${tool.badge}`}>{tool.badge}</span>
                  )}
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "17px", fontWeight: 700, color: "#f1f5f9", marginBottom: "6px" }}>{tool.name}</h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#94a3b8", lineHeight: 1.6 }}>{tool.shortDescription}</p>
                </div>
                <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "6px", color: "#818cf8", fontSize: "13px", fontWeight: 600 }}>
                  Open Tool <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          );
          })}
        </div>
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <Link href="/tools" className="btn-ghost">
            View All 21 Tools <ArrowRight size={15} style={{ display: "inline", verticalAlign: "middle" }} />
          </Link>
        </div>
      </section>

      {/* ── Feature Highlights ── */}
      <section style={{ padding: "0 24px 80px", maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.02em", marginBottom: "12px" }}>
            Why ToolForge?
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "16px", color: "#94a3b8" }}>
            Built by developers, for developers — with a focus on speed and privacy.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {FEATURE_HIGHLIGHTS.map((f) => (
            <div key={f.title} className="glass-card-static" style={{ padding: "28px", borderRadius: "16px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: `${f.color}18`,
                  border: `1px solid ${f.color}40`,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
              >
                <f.icon size={24} color={f.color} />
              </div>
              <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "17px", fontWeight: 700, color: "#f1f5f9", marginBottom: "8px" }}>{f.title}</h3>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#94a3b8", lineHeight: 1.6 }}>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Categories ── */}
      <section style={{ padding: "0 24px 80px", maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.02em", marginBottom: "12px" }}>
            Every Category Covered
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px" }}>
          {CATEGORIES.map((cat) => (
            <Link key={cat.key} href={`/tools?category=${cat.key}`} style={{ textDecoration: "none" }}>
              <div
                className="glass-card"
                style={{ padding: "20px", textAlign: "center" }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    background: `${cat.color}18`,
                    border: `1px solid ${cat.color}40`,
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 12px",
                  }}
                >
                  <cat.icon size={22} color={cat.color} />
                </div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 600, color: "#f1f5f9" }}>{cat.label}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#475569", marginTop: "4px" }}>
                  {TOOLS.filter((t) => t.category === cat.key).length} tools
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ padding: "0 24px 80px", maxWidth: "1280px", margin: "0 auto" }}>
        <div
          className="glass-card-static"
          style={{
            padding: "56px 40px",
            textAlign: "center",
            background: "var(--color-surface-high)",
            borderColor: "rgba(99,102,241,0.3)",
          }}
        >
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em", marginBottom: "16px" }}>
            Ready to build faster?
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "17px", color: "#94a3b8", lineHeight: 1.6, marginBottom: "32px" }}>
            21 powerful tools. Zero logins. Infinite usage. All free.
          </p>
          <Link href="/tools" className="btn-primary" style={{ fontSize: "16px", padding: "14px 32px" }}>
            Start Using ToolForge <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
