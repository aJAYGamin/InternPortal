import { useState, useMemo } from "react";

/**
 * Generic "which id is currently hovered" hook — used for message hover
 * toolbars, list-row hover actions, etc. Returns stable handlers so they're
 * safe to spread onto onMouseEnter/onMouseLeave without re-creating closures
 * per render.
 */
export function useHoverMessageId() {
  const [hoveredMsgId, setHoveredMsgId] = useState<string | null>(null);

  const handlersFor = useMemo(
    () => (id: string) => ({
      onMouseEnter: () => setHoveredMsgId(id),
      onMouseLeave: () => setHoveredMsgId((cur) => (cur === id ? null : cur)),
    }),
    [],
  );

  return { hoveredMsgId, handlersFor };
}