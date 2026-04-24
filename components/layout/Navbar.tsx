"use client";
// components/layout/Navbar.tsx

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Zap,
  Search,
  Menu,
  X,
  Wrench,
  Info,
  Mail,
} from "lucide-react";
import { TOOLS } from "@/lib/tools/registry";
import { getToolIcon } from "@/lib/tools/icons";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const results = query.trim()
    ? TOOLS.filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.keywords.some((k) => k.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 6)
    : [];

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setQuery("");
  }, [pathname]);

  useEffect(() => {
    if (searchOpen && inputRef.current) inputRef.current.focus();
  }, [searchOpen]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setQuery("");
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setQuery("");
      }
    }
    if (searchOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [searchOpen]);

  const navLinks = [
    { href: "/tools", label: "Tools", icon: Wrench },
    { href: "/about", label: "About", icon: Info },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          width: "100%",
          background: "rgba(10, 10, 26, 0.72)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 32px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 16px rgba(99,102,241,0.5)",
                flexShrink: 0,
              }}
            >
              <Zap size={18} color="#fff" />
            </div>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "18px",
                background: "linear-gradient(90deg, #f1f5f9, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.02em",
              }}
            >
              ToolForge
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: "4px" }} className="hidden md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: pathname.startsWith(l.href) ? "#818cf8" : "#94a3b8",
                  background: pathname.startsWith(l.href) ? "rgba(99,102,241,0.12)" : "transparent",
                  textDecoration: "none",
                  transition: "color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!pathname.startsWith(l.href)) {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#f1f5f9";
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!pathname.startsWith(l.href)) {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#94a3b8";
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  }
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Search button */}
            <button
              className="btn-icon"
              onClick={() => setSearchOpen(true)}
              title="Search tools (Ctrl+K)"
            >
              <Search size={16} />
            </button>

            {/* CTA */}
            <Link href="/tools" className="btn-primary hidden md:inline-flex" style={{ fontSize: "13px", padding: "8px 18px" }}>
              Browse Tools
            </Link>

            {/* Mobile menu */}
            <button
              className="btn-icon md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              padding: "16px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              background: "rgba(10, 10, 26, 0.95)",
            }}
          >
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: pathname.startsWith(l.href) ? "#818cf8" : "#94a3b8",
                  background: pathname.startsWith(l.href) ? "rgba(99,102,241,0.12)" : "transparent",
                  textDecoration: "none",
                }}
              >
                <l.icon size={16} />
                {l.label}
              </Link>
            ))}
            <Link
              href="/tools"
              className="btn-primary"
              style={{ marginTop: "8px", justifyContent: "center" }}
            >
              Browse Tools
            </Link>
          </div>
        )}
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: "80px",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <div
            ref={searchRef}
            className="glass-card-static"
            style={{ width: "100%", maxWidth: "560px", overflow: "hidden" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <Search size={18} color="#94a3b8" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools… (Ctrl+K)"
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontFamily: "var(--font-sans)",
                  fontSize: "16px",
                  color: "#f1f5f9",
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setSearchOpen(false);
                    setQuery("");
                  }
                }}
              />
              <kbd style={{ fontSize: "11px", color: "#475569", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "4px", padding: "2px 6px" }}>
                ESC
              </kbd>
            </div>

            {results.length > 0 && (
              <div style={{ maxHeight: "360px", overflowY: "auto" }}>
                {results.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => {
                      router.push(`/tools/${tool.slug}`);
                      setSearchOpen(false);
                      setQuery("");
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      width: "100%",
                      padding: "12px 20px",
                      background: "transparent",
                      border: "none",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}
                  >
                    <div style={{ width: "36px", height: "36px", background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {(() => { const Icon = getToolIcon(tool.icon); return <Icon size={14} color="#818cf8" />; })()}
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "14px", color: "#f1f5f9" }}>{tool.name}</div>
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#94a3b8" }}>{tool.categoryLabel}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {query.trim() && results.length === 0 && (
              <div style={{ padding: "32px 20px", textAlign: "center", color: "#475569", fontFamily: "var(--font-sans)", fontSize: "14px" }}>
                No tools found for &ldquo;{query}&rdquo;
              </div>
            )}

            {!query.trim() && (
              <div style={{ padding: "16px 20px" }}>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>Popular tools</div>
                {TOOLS.filter((t) => t.badge === "popular").slice(0, 5).map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => {
                      router.push(`/tools/${tool.slug}`);
                      setSearchOpen(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      width: "100%",
                      padding: "8px 12px",
                      background: "transparent",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}
                  >
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#94a3b8" }}>{tool.name}</span>
                    <span style={{ marginLeft: "auto", fontSize: "11px", color: "#475569" }}>{tool.categoryLabel}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
