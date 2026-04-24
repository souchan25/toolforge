// components/tools/RelatedTools.tsx
import Link from "next/link";
import type { Tool } from "@/lib/tools/registry";
import { ArrowRight } from "lucide-react";
import { getToolIcon } from "@/lib/tools/icons";

const CATEGORY_COLORS: Record<string, string> = {
  text: "#10b981", json: "#6366f1", css: "#8b5cf6",
  color: "#f59e0b", devutils: "#0891b2", code: "#f43f5e",
};

interface Props {
  tools: Tool[];
  style?: React.CSSProperties;
}

export function RelatedTools({ tools, style }: Props) {
  return (
    <div style={style}>
      <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "18px", fontWeight: 700, color: "#f1f5f9", marginBottom: "16px" }}>
        Related Tools
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
        {tools.map((tool) => {
          const color = CATEGORY_COLORS[tool.category] ?? "#818cf8";
          const ToolIcon = getToolIcon(tool.icon);
          return (
            <Link key={tool.id} href={`/tools/${tool.slug}`} style={{ textDecoration: "none" }}>
              <div
                className="glass-card"
                style={{ padding: "16px 18px", display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    background: `${color}18`,
                    border: `1px solid ${color}40`,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <ToolIcon size={16} color={color} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#f1f5f9", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {tool.name}
                  </div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#475569" }}>{tool.categoryLabel}</div>
                </div>
                <ArrowRight size={14} color="#475569" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
