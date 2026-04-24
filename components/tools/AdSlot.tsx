// components/tools/AdSlot.tsx

interface Props {
  type: "banner" | "sidebar" | "bottom";
  style?: React.CSSProperties;
}

const MIN_HEIGHTS: Record<Props["type"], string> = {
  banner: "90px",
  sidebar: "250px",
  bottom: "90px",
};

export function AdSlot({ type, style }: Props) {
  return (
    <div
      className="ad-slot"
      style={{ minHeight: MIN_HEIGHTS[type], ...style }}
    >
      <span>Advertisement</span>
      <span style={{ fontSize: "9px", opacity: 0.5 }}>
        Google AdSense — {type === "sidebar" ? "300×250" : "Responsive"} Unit
      </span>
    </div>
  );
}
