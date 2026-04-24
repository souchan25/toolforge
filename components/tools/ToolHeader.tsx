// components/tools/ToolHeader.tsx
import type { Tool } from "@/lib/tools/registry";
import { ICON_MAP } from "@/lib/tools/icons";
import { Code2 } from "lucide-react";

const CATEGORY_COLORS: Record<string, string> = {
  text: "#10b981",
  json: "#6366f1",
  css: "#8b5cf6",
  color: "#f59e0b",
  devutils: "#0891b2",
  code: "#f43f5e",
};

interface Props {
  tool: Tool;
}

export function ToolHeader({ tool }: Props) {
  const color = CATEGORY_COLORS[tool.category] ?? "#818cf8";
  const ToolIcon = ICON_MAP[tool.icon] ?? Code2;
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "18px", flexWrap: "wrap" }}>
      <div
        style={{
          width: "56px",
          height: "56px",
          background: `${color}18`,
          border: `1px solid ${color}40`,
          borderRadius: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <ToolIcon size={26} color={color} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "6px" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em", margin: 0 }}>
            {tool.name}
          </h1>
          {tool.badge && (
            <span className={`badge badge-${tool.badge}`}>{tool.badge}</span>
          )}
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#475569", fontWeight: 500, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px", padding: "3px 10px" }}>
            {tool.categoryLabel}
          </span>
        </div>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "#94a3b8", margin: 0, maxWidth: "600px", lineHeight: 1.6 }}>
          {tool.description}
        </p>
      </div>
    </div>
  );
}
