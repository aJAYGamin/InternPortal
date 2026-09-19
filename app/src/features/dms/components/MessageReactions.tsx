import colors from "@styles/colors";

import type { MessageReaction } from "../types";

interface MessageReactionsProps {
  authId: string;
  reactions: MessageReaction[];
  onToggle: (emoji: string) => void;
}

/** Row of reaction pills under a message bubble; clicking a pill toggles your own reaction. */
export default function MessageReactions({ reactions, onToggle, authId }: MessageReactionsProps) {
  if (reactions.length === 0) return null;
  return (
    <div style={{ display: "flex", gap: 4, marginTop: 4, flexWrap: "wrap" }}>
      {reactions.map((r) => {
        const mine = r.userIds.includes(authId);

        return (
          <button
            key={r.emoji}
            onClick={() => onToggle(r.emoji)}
            style={{
              padding: "2px 7px",
              borderRadius: 10,
              border: `1px solid ${mine ? colors.MAGENTA : "#C8DCF0"}`,
              background: mine ? colors.MAGENTA_LIGHT : "#fff",
              cursor: "pointer",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 12,
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}>
            {r.emoji} <span style={{ color: "#1A1A1A" }}>{r.count}</span>
          </button>
        );
      })}
    </div>
  );
}
