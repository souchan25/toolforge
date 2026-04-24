"use client";
// app/tools/page.tsx — Tools Listing

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowRight, Code2, AlignLeft, Braces, Palette, Hash, Filter } from "lucide-react";
import { TOOLS, CATEGORY_LABELS, type ToolCategory } from "@/lib/tools/registry";
import { getToolIcon } from "@/lib/tools/icons";

const ICONS = {
  Code2,
  AlignLeft,
  Braces,
  Palette,
  Hash,
  Filter,
};

const ALL_CATEGORIES: (ToolCategory | "all")[] = ["all", "text", "json", "css", "color", "devutils", "code"];

const CATEGORY_COLORS: Record<string, string> = {
  all: "#818cf8",
  text: "#10b981",
  json: "#6366f1",
  css: "#8b5cf6",
  color: "#f59e0b",
  devutils: "#0891b2",
  code: "#f43f5e",
};

export default function ToolsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<ToolCategory | "all">("all");

  const filtered = useMemo(() => {
    let tools = TOOLS;
    if (activeCategory !== "all") tools = tools.filter((t) => t.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      tools = tools.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.shortDescription.toLowerCase().includes(q) ||
          t.keywords.some((k) => k.toLowerCase().includes(q))
      );
    }
    return tools;
  }, [search, activeCategory]);

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 24px 80px" }}>
      {/* Page Header */}
      <div style={{ marginBottom: "48px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "5px 14px",
            borderRadius: "999px",
            background: "rgba(99,102,241,0.12)",
            border: "1px solid rgba(99,102,241,0.3)",
            marginBottom: "20px",
          }}
        >
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600, color: "#818cf8" }}>
            All Tools
          </span>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 5vw, 48px)",
            fontWeight: 800,
            color: "#f1f5f9",
            letterSpacing: "-0.03em",
            marginBottom: "12px",
          }}
        >
          Developer Utilities
        </h1>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "16px", color: "#94a3b8", maxWidth: "500px" }}>
          {TOOLS.length} tools across {Object.keys(CATEGORY_LABELS).length} categories — all free, all in your browser.
        </p>
      </div>

      {/* Search bar */}
      <div style={{ position: "relative", marginBottom: "32px", maxWidth: "560px" }}>
        <Search size={16} color="#475569" style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
        <input
          type="text"
          placeholder="Search tools by name or keyword…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="glass-input glass-input-text"
          style={{ paddingLeft: "44px", fontFamily: "var(--font-sans)", fontSize: "15px" }}
        />
      </div>

      {/* Category Tabs */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          marginBottom: "40px",
        }}
      >
        {ALL_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          const color = CATEGORY_COLORS[cat] ?? "#818cf8";
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "7px 18px",
                borderRadius: "999px",
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                border: `1px solid ${isActive ? color + "50" : "rgba(255,255,255,0.1)"}`,
                background: isActive ? `${color}18` : "rgba(255,255,255,0.04)",
                color: isActive ? color : "#94a3b8",
                transition: "all 0.2s ease",
              }}
            >
              {cat === "all" ? "All Tools" : CATEGORY_LABELS[cat]}
              <span style={{ marginLeft: "6px", opacity: 0.6, fontSize: "11px" }}>
                ({cat === "all" ? TOOLS.length : TOOLS.filter((t) => t.category === cat).length})
              </span>
            </button>
          );
        })}
      </div>

      {/* Results count */}
      {search && (
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#475569", marginBottom: "24px" }}>
          {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{search}&rdquo;
        </p>
      )}

      {/* Tool Grid */}
      {filtered.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
            gap: "20px",
          }}
        >
          {filtered.map((tool, i) => {
            const color = CATEGORY_COLORS[tool.category] ?? "#818cf8";
            const ToolIcon = getToolIcon(tool.icon);
            return (
              <Link key={tool.id} href={`/tools/${tool.slug}`} style={{ textDecoration: "none" }}>
                <div
                  className="glass-card"
                  style={{
                    padding: "24px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                    animationDelay: `${(i % 12) * 0.04}s`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        background: `${color}18`,
                        border: `1px solid ${color}40`,
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <ToolIcon size={20} color={color} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
                      {tool.badge && (
                        <span className={`badge badge-${tool.badge}`}>{tool.badge}</span>
                      )}
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#475569", fontWeight: 500 }}>
                        {tool.categoryLabel}
                      </span>
                    </div>
                  </div>

                  <div style={{ flex: 1 }}>
                    <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "16px", fontWeight: 700, color: "#f1f5f9", marginBottom: "8px", lineHeight: 1.3 }}>
                      {tool.name}
                    </h2>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#94a3b8", lineHeight: 1.6 }}>
                      {tool.shortDescription}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: "6px",
                      color: color,
                      fontSize: "13px",
                      fontWeight: 600,
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    Open Tool <ArrowRight size={13} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div
          className="glass-card-static"
          style={{ padding: "64px", textAlign: "center" }}
        >
          <Search size={40} color="#475569" style={{ margin: "0 auto 16px" }} />
          <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "18px", fontWeight: 700, color: "#f1f5f9", marginBottom: "8px" }}>
            No tools found
          </h3>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#94a3b8" }}>
            Try a different keyword or clear the search.
          </p>
          <button
            className="btn-ghost"
            style={{ marginTop: "20px" }}
            onClick={() => { setSearch(""); setActiveCategory("all"); }}
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Ad Slot — in-feed */}
      <div className="ad-slot" style={{ minHeight: "90px", marginTop: "48px", padding: "16px" }}>
        <span>Advertisement</span>
        <span style={{ fontSize: "9px", opacity: 0.5 }}>Google AdSense — Responsive Ad Unit</span>
      </div>
    </div>
  );
}
