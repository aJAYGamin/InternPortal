import type { RefObject, KeyboardEvent } from "react";

import type { DmMessage } from "../types";
import { senderDisplayName } from "../utils/dmFormat";

import colors from "@styles/colors";
import { DM_USERS } from "../mockData";

interface MessageComposerProps {
  authId: string;
  placeholder: string;
  draft: string;
  replyTo: DmMessage | null;
  inputRef: RefObject<HTMLInputElement | null>;
  onDraftChange: (text: string) => void;
  onSend: () => void;
  onCancelReply: () => void;
}

/** Bottom-of-thread composer: optional reply bar, text input, send button. */
export default function MessageComposer(props: MessageComposerProps) {
  const { placeholder, draft, onDraftChange, onSend, replyTo, onCancelReply, inputRef, authId } = props;

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  return (
    <>
      {replyTo && <ReplyBar authId={authId} replyTo={replyTo} onCancel={onCancelReply} />}

      <div style={{ padding: "12px 20px", borderTop: "1px solid #D4E6F5", display: "flex", gap: 8, flexShrink: 0 }}>
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => {
            onDraftChange(e.target.value);
            clearTimeout((inputRef?.current as any)?._typingTimer);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          style={{
            flex: 1,
            padding: "9px 14px",
            borderRadius: 10,
            border: "1.5px solid #C8DCF0",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 14,
            color: "#1A1A1A",
            outline: "none",
            background: "#fff",
          }}
        />
        <button
          onClick={onSend}
          style={{
            padding: "9px 18px",
            borderRadius: 10,
            border: "none",
            background: colors.MAGENTA,
            color: "#fff",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = colors.MAGENTA_DARK)}
          onMouseLeave={(e) => (e.currentTarget.style.background = colors.MAGENTA)}>
          Send
        </button>
      </div>
    </>
  );
}

interface ReplyBarProps {
  authId: string;
  replyTo: DmMessage;
  onCancel: () => void;
}

/** The "Replying to X: ..." strip shown above the composer input. */
export function ReplyBar({ authId, replyTo, onCancel }: ReplyBarProps) {
  return (
    <div
      style={{
        padding: "8px 20px",
        borderTop: "1px solid #D4E6F5",
        background: "#F5F9FF",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}>
      <div
        style={{
          flex: 1,
          fontSize: 13,
          fontFamily: "Helvetica, Arial, sans-serif",
          color: "#1A1A1A",
          borderLeft: `3px solid ${colors.MAGENTA}`,
          paddingLeft: 8,
        }}>
        Replying to{" "}
        <strong>{replyTo.senderId === authId ? "yourself" : senderDisplayName(replyTo.senderId, DM_USERS)}</strong>:{" "}
        {replyTo.text}
      </div>

      <button
        onClick={onCancel}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontSize: 16,
          color: "#999",
          lineHeight: 1,
        }}>
        ×
      </button>
    </div>
  );
}
