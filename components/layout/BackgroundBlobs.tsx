"use client";
// components/layout/BackgroundBlobs.tsx
export function BackgroundBlobs() {
  return (
    <div
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none", overflow: "hidden" }}
    >
      {/* Purple blob — top left */}
      <div
        className="blob"
        style={{
          width: "600px",
          height: "600px",
          top: "-15%",
          left: "-10%",
          background: "rgba(124, 58, 237, 0.28)",
          animationDuration: "28s",
        }}
      />
      {/* Blue blob — top right */}
      <div
        className="blob"
        style={{
          width: "520px",
          height: "520px",
          top: "-5%",
          right: "-8%",
          background: "rgba(37, 99, 235, 0.2)",
          animationDuration: "22s",
          animationDelay: "-8s",
        }}
      />
      {/* Teal blob — bottom center */}
      <div
        className="blob"
        style={{
          width: "450px",
          height: "450px",
          bottom: "-10%",
          left: "30%",
          background: "rgba(8, 145, 178, 0.18)",
          animationDuration: "32s",
          animationDelay: "-15s",
        }}
      />
    </div>
  );
}
