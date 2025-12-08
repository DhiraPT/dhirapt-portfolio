import { ImageResponse } from "next/og";
import { supabase } from "@/lib/supabase";

export const runtime = "edge";

export const alt = "DhiraPT's Lab - Blog Post Cover";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: post } = await supabase
    .from("BlogPosts")
    .select("title, subtitle")
    .eq("slug", slug)
    .single();

  const title = post?.title || "Blog Post";
  const subtitle = post?.subtitle || "";

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        backgroundColor: "#030014",
        padding: "80px",
        fontFamily: "sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Gradients */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-20%",
          width: "800px",
          height: "800px",
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, rgba(3, 0, 20, 0) 70%)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-10%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(3, 0, 20, 0) 70%)",
          borderRadius: "50%",
        }}
      />

      {/* Content */}
      <div style={{ display: "flex", flexDirection: "column", zIndex: 10, maxWidth: "90%" }}>
        <div
          style={{
            fontSize: 24,
            color: "#a78bfa", // violet-400
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div style={{ width: 40, height: 2, background: "#a78bfa" }} />
          Blog Post
        </div>

        {/* Main Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "white",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            textShadow: "0 4px 20px rgba(0,0,0,0.5)",
            marginBottom: 16,
          }}
        >
          {title}
        </div>

        {/* Render Subtitle (if it exists) */}
        {subtitle && (
          <div
            style={{
              fontSize: 24, // Smaller than title
              fontWeight: 400,
              color: "#94a3b8", // slate-400 (Grey/Muted)
              lineHeight: 1.3,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>

      {/* Footer Brand */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: "linear-gradient(135deg, #7c3aed, #4c1d95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 20,
            fontWeight: 900,
            boxShadow: "0 4px 12px rgba(124, 58, 237, 0.4)",
          }}
        >
          DP
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#e2e8f0",
            fontWeight: 600,
          }}
        >
          DhiraPT
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
