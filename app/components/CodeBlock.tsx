"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  fontSize?: string;
}

export default function CodeBlock({
  code,
  language = "rust",
  className = "",
  fontSize = "0.78rem",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const customStyle: React.CSSProperties = {
    background: "#161b22",
    borderRadius: "0.75rem",
    padding: "1.1rem 1.25rem",
    fontSize,
    lineHeight: "1.65",
    margin: 0,
    border: "1px solid rgba(255,255,255,0.07)",
    overflow: "auto",
  };

  return (
    <div className={`relative ${className}`}>
      {/* Language badge */}
      <span
        className="absolute top-2.5 right-16 text-[10px] font-mono uppercase tracking-widest z-10"
        style={{ color: "rgba(255,255,255,0.25)" }}
      >
        {language}
      </span>
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2.5 z-10 px-2 py-1 rounded-lg text-[10px] font-medium transition-all cursor-pointer"
        style={{
          background: copied ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.06)",
          border: `1px solid ${copied ? "rgba(16,185,129,0.4)" : "rgba(255,255,255,0.1)"}`,
          color: copied ? "#6ee7b7" : "rgba(255,255,255,0.4)",
        }}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={customStyle}
        wrapLines
        className="no-scrollbar"
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
