import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "DhiraPT's Lab - Personal R&D & AI Experiments";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 100, fontWeight: "bold", color: "#000" }}>DhiraPT&apos;s Lab</div>
      <div style={{ fontSize: 32, color: "#666", marginTop: 20, textAlign: "center" }}>
        Personal R&D • Scalable AI Systems • Experiments
      </div>
    </div>,
    {
      ...size,
    },
  );
}
