"use client";

import { motion } from "framer-motion";

interface FlowNode {
  id: string;
  label: string;
  type: "action" | "decision" | "result";
  sublabel?: string;
}

interface FlowEdge {
  from: string;
  to: string;
  label?: string;
}

interface FlowDiagramProps {
  nodes: FlowNode[];
  edges: FlowEdge[];
  title?: string;
}

const TYPE_STYLES = {
  action: {
    bg: "var(--card-bg)",
    border: "rgba(var(--accent-rgb),0.3)",
    color: "var(--text)",
    shape: "rounded-xl",
  },
  decision: {
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.4)",
    color: "#fbbf24",
    shape: "rounded-xl",
  },
  result: {
    bg: "rgba(34,197,94,0.08)",
    border: "rgba(34,197,94,0.4)",
    color: "#4ade80",
    shape: "rounded-xl",
  },
};

export default function FlowDiagram({ nodes, edges, title }: FlowDiagramProps) {
  // Simple top-to-bottom linear layout — works for chains up to ~8 nodes
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  // Build ordered chain by following edges from first node
  const outgoing: Record<string, FlowEdge | undefined> = {};
  edges.forEach((e) => { outgoing[e.from] = e; });
  const incoming = new Set(edges.map((e) => e.to));
  const root = nodes.find((n) => !incoming.has(n.id)) ?? nodes[0];
  const chain: { node: FlowNode; edge?: FlowEdge }[] = [];
  let chainCursor: string | null = root.id;
  while (chainCursor !== null) {
    const node = nodeMap[chainCursor];
    if (!node) break;
    const edge: FlowEdge | undefined = outgoing[chainCursor];
    chain.push({ node, edge });
    chainCursor = edge ? edge.to : null;
  }

  return (
    <div className="flex flex-col items-center gap-0">
      {title && (
        <p className="text-xs font-semibold uppercase tracking-widest mb-4 self-start" style={{ color: "var(--accent)" }}>
          {title}
        </p>
      )}

      {chain.map(({ node, edge }, i) => {
        const s = TYPE_STYLES[node.type];
        return (
          <div key={node.id} className="flex flex-col items-center w-full max-w-sm">
            {/* Node */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`w-full px-4 py-3 text-center ${s.shape}`}
              style={{ background: s.bg, border: `1px solid ${s.border}` }}
            >
              <p className="text-sm font-semibold" style={{ color: s.color }}>{node.label}</p>
              {node.sublabel && (
                <p className="text-[10px] mt-0.5" style={{ color: "var(--text-dim)" }}>{node.sublabel}</p>
              )}
            </motion.div>

            {/* Arrow connector */}
            {edge && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 + 0.08 }}
                className="flex flex-col items-center py-1"
              >
                <div className="w-px h-4" style={{ background: "rgba(var(--accent-rgb),0.3)" }} />
                {edge.label && (
                  <span className="text-[10px] px-2" style={{ color: "var(--text-dim)" }}>{edge.label}</span>
                )}
                <span style={{ color: "rgba(var(--accent-rgb),0.6)", lineHeight: 1 }}>▾</span>
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
}
