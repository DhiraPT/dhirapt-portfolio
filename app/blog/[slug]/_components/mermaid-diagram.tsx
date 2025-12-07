"use client";

import mermaid from "mermaid";
import { useTheme } from "next-themes";
import { useEffect, useId, useState, useRef } from "react";

interface MermaidDiagramProps {
  code: string;
}

export function MermaidDiagram({ code }: MermaidDiagramProps) {
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Create a unique, sanitized ID for this diagram instance
  // We strip colons because useId() returns ":r1:" which is an invalid CSS selector
  const id = useId().replace(/:/g, "");
  const mermaidId = `mermaid-${id}`;
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let aborted = false;

    const renderDiagram = async () => {
      if (!code) return;

      try {
        // Initialize for this specific render to ensure theme is picked up
        mermaid.initialize({
          startOnLoad: false,
          theme: resolvedTheme === "dark" ? "dark" : "default",
          securityLevel: "loose",
          fontFamily: "inherit",
        });

        // Generate the SVG
        const { svg: generatedSvg } = await mermaid.render(mermaidId, code);

        if (!aborted) {
          setSvg(generatedSvg);
          setError(null);
        }
      } catch (err) {
        if (!aborted) {
          console.error("Mermaid rendering failed:", err);
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      }
    };

    renderDiagram();

    return () => {
      aborted = true;
    };
  }, [code, mermaidId, resolvedTheme]);

  if (error) {
    return (
      <div className="border-destructive/20 bg-destructive/10 text-destructive rounded-md border p-4 text-xs">
        <p className="font-bold">Diagram Error</p>
        <pre className="mt-2 whitespace-pre-wrap">{error}</pre>
      </div>
    );
  }

  return (
    <div
      ref={elementRef}
      className="my-8 flex justify-center overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
