import ThreadHeader from "./ThreadHeader";
import MessageComposer from "./MessageComposer";
import MessageList from "./MessageList";
import type { DmConversation, DmMessage, DmUser } from "../types";

interface ThreadPanelProps {
  authId: string;
  active: DmConversation | null;
  name: string;
  otherUser: DmUser | null;
  // onToggleMute: () => void;
  onTogglePin: () => void;
  hoveredId: string | null;
  handlersFor: (id: string) => { onMouseEnter: () => void; onMouseLeave: () => void };
  onToggleReaction: (msgId: string, emoji: string) => void;
  onReply: (msg: DmMessage) => void;
  bottomRef: React.RefObject<HTMLDivElement | null>;
  draft: string;
  onDraftChange: (text: string) => void;
  onSend: () => void;
  replyTo: DmMessage | null;
  onCancelReply: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

/**
 * Right-hand thread column: header + message list + composer, or an empty state when nothing is selected.
 */
export default function ThreadPanel({
  authId,
  active,
  name,
  otherUser,
  // onToggleMute,
  onTogglePin,
  hoveredId,
  handlersFor,
  onToggleReaction,
  onReply,
  bottomRef,
  draft,
  onDraftChange,
  onSend,
  replyTo,
  onCancelReply,
  inputRef,
}: ThreadPanelProps) {
  if (!active)
    return (
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>💬</div>
          <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: 16, color: "#1A1A1A" }}>
            Select a conversation
          </div>
        </div>
      </div>
    );

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
      <ThreadHeader
        convo={active}
        name={name}
        otherUser={otherUser}
        // onToggleMute={onToggleMute}
        onTogglePin={onTogglePin}
      />
      <MessageList
        authId={authId}
        convo={active}
        hoveredId={hoveredId}
        handlersFor={handlersFor}
        onToggleReaction={onToggleReaction}
        onReply={onReply}
        bottomRef={bottomRef}
      />

      <MessageComposer
        authId={authId}
        placeholder={`Message ${name}…`}
        draft={draft}
        onDraftChange={onDraftChange}
        onSend={onSend}
        replyTo={replyTo}
        onCancelReply={onCancelReply}
        inputRef={inputRef}
      />
    </div>
  );
}
