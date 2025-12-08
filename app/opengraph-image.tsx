import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "DhiraPT - Personal R&D Lab";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#030014", // Deep void black/blue
        position: "relative",
        fontFamily: "sans-serif",
      }}
    >
      {/* Ambient Violet Glow Center */}
      <div
        style={{
          position: "absolute",
          width: "1000px",
          height: "600px",
          background:
            "radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.15), transparent 60%)",
          filter: "blur(60px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Technical Grid Pattern - Fades out at edges */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
          maskImage: "radial-gradient(circle at 50% 50%, black 40%, transparent 90%)",
        }}
      />

      {/* Main Title - Massive & Glowing */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: 180,
            fontWeight: 900,
            letterSpacing: "-0.05em",
            color: "white",
            lineHeight: 0.85,
            // Multi-layered shadow for that neon/holographic feel
            textShadow: "0 0 80px rgba(167, 139, 250, 0.6), 0 0 30px rgba(124, 58, 237, 0.4)",
            display: "flex",
          }}
        >
          DhiraPT
        </div>
      </div>

      {/* Decorative Accent Line */}
      <div
        style={{
          position: "absolute",
          bottom: "100px",
          height: "4px",
          width: "200px",
          background: "linear-gradient(90deg, transparent, #a78bfa, transparent)",
          opacity: 0.5,
        }}
      />
    </div>,
    {
      ...size,
    },
  );
}
