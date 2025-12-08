import { ImageResponse } from "next/og";
import { supabase } from "@/lib/supabase";

export const runtime = "edge";

export const alt = "DhiraPT's Lab - Blog Post Cover";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const slug = (await params).slug;
  const { data: post } = await supabase.from("BlogPosts").select("title").eq("slug", slug).single();

  const title = post?.title || "Blog Post";

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
        padding: 80,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 60,
          fontWeight: "bold",
          color: "black",
          lineHeight: 1.2,
        }}
      >
        {title}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 40,
          fontSize: 24,
          color: "#666",
        }}
      >
        DhiraPT&apos;s Lab • Blog
      </div>
    </div>,
    {
      ...size,
    },
  );
}
