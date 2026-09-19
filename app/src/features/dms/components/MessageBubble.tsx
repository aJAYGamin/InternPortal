import { formatDmTime, senderDisplayName } from "../utils/dmFormat";
import MessageReactions from "./MessageReactions";
import MessageHoverActions from "./MessageHoverAction";
import Avatar from "@icons/Avatar";

import type { DmMessage } from "../types";
import { DM_USERS } from "../mockData";

import colors from "@styles/colors";

interface MessageBubbleProps {
  authId: string;
  message: DmMessage;
  showName: boolean;
  showAvatar: boolean;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onToggleReaction: (emoji: string) => void;
  onReply: () => void;
}

/**
 * One message row: optional sender name, avatar, bubble (with reply preview,
 * text, reactions), timestamp/status column, and the hover toolbar. All the
 * layout math (who gets an avatar, left vs right alignment) is decided by the
 * caller (MessageList) — this component just renders one message.
 */
export function MessageBubble({
  authId,
  message,
  showName,
  showAvatar,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onToggleReaction,
  onReply,
}: MessageBubbleProps) {
  const isMine = message.senderId === authId;

  return (
    <div
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: isMine ? "flex-end" : "flex-start",
        position: "relative",
      }}>
      {showName && (
        <span
          style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 12,
            fontWeight: 600,
            color: "#1A1A1A",
            marginBottom: 3,
            marginLeft: 34,
          }}>
          {senderDisplayName(message.senderId, DM_USERS)}
        </span>
      )}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, flexDirection: isMine ? "row-reverse" : "row" }}>
        {!isMine && showAvatar ? (
          <Avatar name={senderDisplayName(message.senderId, DM_USERS)} size={26} />
        ) : (
          <div style={{ width: 26 }} />
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: isMine ? "flex-end" : "flex-start",
            maxWidth: 340,
          }}>
          <div
            style={{
              padding: "9px 13px",
              borderRadius: isMine ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
              background: isMine ? colors.MAGENTA : "#D4E6F5",
              color: isMine ? "#fff" : "#1A1A1A",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 14,
              lineHeight: 1.5,
            }}>
            {message.isDeleted ? <em style={{ opacity: 0.6 }}>Message deleted</em> : message.text}
            {message.isEdited && !message.isDeleted && (
              <span style={{ fontSize: 10, opacity: 0.6, marginLeft: 6 }}>(edited)</span>
            )}
          </div>
          <MessageReactions authId={authId} reactions={message.reactions ?? []} onToggle={onToggleReaction} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <span style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: 11, color: "#1A1A1A", flexShrink: 0 }}>
            {formatDmTime(message.createdAt)}
          </span>
          {/* {isMine && <StatusTick status={message.status} />} */}
        </div>
      </div>

      {isHovered && !message.isDeleted && (
        <MessageHoverActions isAuth={isMine} onReact={onToggleReaction} onReply={onReply} />
      )}
    </div>
  );
}

// Re-add `MessageStatus` to the type import above when this is uncommented.
// export function StatusTick({ status }: { status: MessageStatus }) {
//   if (status === "sending") return <span style={{ fontSize: 10, color: "#aaa" }}>○</span>;
//   if (status === "sent") return <span style={{ fontSize: 10, color: "#aaa" }}>✓</span>;
//   if (status === "delivered") return <span style={{ fontSize: 10, color: "#aaa" }}>✓✓</span>;
//   if (status === "read") return <span style={{ fontSize: 10, color: colors.MAGENTA }}>✓✓</span>;
//   return null;
// }
