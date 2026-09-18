import type { DmConversation, DmUser } from "../types";

import { formatDmTime, senderDisplayName } from "../utils/dmFormat";
import { DM_USERS } from "../mockData";

import Avatar from "@icons/Avatar";
import GroupAvatar from "@icons/GroupAvatar";
import OnlineDot from "@icons/OnlineDot";
import colors from "@styles/colors";

interface ConversationItemProps {
  authId: string;
  convo: DmConversation;
  name: string;
  otherUser: DmUser | null;
  isActive: boolean;
  fullscreen: boolean;
  onSelect: (id: string) => void;
}

/** One row in the conversation list: avatar, name, last message preview, unread badge. */
export default function ConversationItem(props: ConversationItemProps) {
  const { convo, onSelect, isActive, fullscreen, name, otherUser, authId } = props;
  const last = convo.messages[convo.messages.length - 1];
  return (
    <button
      onClick={() => onSelect(convo.id)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "11px 20px",
        border: "none",
        background: isActive && fullscreen ? colors.MAGENTA_LIGHT : "transparent",
        cursor: "pointer",
        textAlign: "left",
        transition: "background 0.1s",
        borderBottom: "1px solid #D4E6F5",
      }}
      onMouseEnter={(e) => {
        if (!(isActive && fullscreen)) e.currentTarget.style.background = "#F5F9FF";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = isActive && fullscreen ? colors.MAGENTA_LIGHT : "transparent";
      }}>
      {/* Avatar with online dot */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        {convo.type === "group" ? <GroupAvatar /> : <Avatar name={name} size={36} />}
        {otherUser?.isOnline && <OnlineDot />}
        {convo.isPinned && <span style={{ position: "absolute", top: -2, right: -2, fontSize: 9 }}>📌</span>}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: convo.unreadCount > 0 ? 700 : 500,
              fontSize: 14,
              color: "#1A1A1A",
            }}>
            {name}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {convo.isMuted && <span style={{ fontSize: 11 }}>🔇</span>}
            <span
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: 11,
                color: "#1A1A1A",
                flexShrink: 0,
              }}>
              {formatDmTime(convo.updatedAt)}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 2 }}>
          <span
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 13,
              fontWeight: convo.unreadCount > 0 ? 500 : 400,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: 155,
              color: "#1A1A1A",
            }}>
            {last?.senderId === authId
              ? "You: "
              : convo.type === "group"
                ? `${senderDisplayName(last.senderId, DM_USERS).split(" ")[0]}: `
                : ""}
            {last?.text ?? ""}
          </span>
          {convo.unreadCount > 0 && !convo.isMuted && (
            <span
              style={{
                background: colors.MAGENTA,
                color: "#fff",
                borderRadius: 9,
                minWidth: 18,
                height: 18,
                padding: "0 4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                flexShrink: 0,
              }}>
              {convo.unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
