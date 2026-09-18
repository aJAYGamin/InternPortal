import { QUICK_REACTIONS } from "../utils/dmFormat";

interface MessageHoverActionsProps {
  isAuth: boolean;
  onReact: (emoji: string) => void;
  onReply: () => void;
}

/** Floating quick-reaction + reply toolbar that appears when hovering a message. */
export default function MessageHoverActions({ isAuth, onReact, onReply }: MessageHoverActionsProps) {
  return (
    <div
      style={{
        position: "absolute",
        top: -10,
        [isAuth ? "left" : "right"]: 200,
        display: "flex",
        gap: 2,
        background: "#fff",
        borderRadius: 8,
        border: "1px solid #C8DCF0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        padding: "2px 4px",
        zIndex: 5,
      }}>
      {QUICK_REACTIONS.map((e) => (
        <HoverButton key={e} onClick={() => onReact(e)}>
          {e}
        </HoverButton>
      ))}
      <HoverButton onClick={onReply} title="Reply">
        ↩
      </HoverButton>
    </div>
  );
}

function HoverButton({ onClick, title, children }: { onClick: () => void; title?: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        width: 26,
        height: 26,
        border: "none",
        background: "transparent",
        cursor: "pointer",
        fontSize: 14,
        borderRadius: 6,
        transition: "background 0.1s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#F0F0F0")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
      {children}
    </button>
  );
}
