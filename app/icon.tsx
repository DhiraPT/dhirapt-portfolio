import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

const ACCENT_HEX = "#3274fe";
const ACCENT_FG_HEX = "#fafafa";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        background: `linear-gradient(135deg, ${ACCENT_HEX} 0%, ${ACCENT_HEX}CC 100%)`,
        fontFamily: "monospace",
        fontSize: 16,
        fontWeight: 700,
        color: ACCENT_FG_HEX,
        boxShadow: `0 10px 15px -3px ${ACCENT_HEX}33, 0 4px 6px -4px ${ACCENT_HEX}33`,
      }}
    >
      DP
    </div>,
    {
      ...size,
    },
  );
}
