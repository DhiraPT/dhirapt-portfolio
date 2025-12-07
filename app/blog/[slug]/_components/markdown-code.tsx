"use client";

import { ComponentPropsWithoutRef } from "react";
import { getCodeString } from "rehype-rewrite";
import type { Element } from "hast";
import { MermaidDiagram } from "./mermaid-diagram";

// Combine standard code props with the 'node' prop passed by react-markdown/rehype
type MarkdownCodeProps = ComponentPropsWithoutRef<"code"> & {
  node?: Element;
};

export function MarkdownCode({ className, children, node, ...props }: MarkdownCodeProps) {
  // Check if the language class indicates mermaid
  const isMermaid = className?.toLowerCase().includes("language-mermaid");

  if (isMermaid) {
    // Extract the raw string content reliably
    const codeContent =
      node && node.children ? getCodeString(node.children) : String(children || "");

    return <MermaidDiagram code={codeContent.trim()} />;
  }

  // Fallback to standard code block rendering
  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
}
