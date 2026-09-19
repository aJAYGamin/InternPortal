import { formatDmTime } from "../utils/dmFormat";
import Avatar from "@icons/Avatar";
import type { DmConversation, DmUser } from "../types";
import colors from "@styles/colors";

interface ThreadHeaderProps {
  convo: DmConversation;
  name: string;
  otherUser: DmUser | null;
  onTogglePin: () => void;
}

/** Top bar of the active thread: avatar, name, presence line, mute/pin toggles. */
export default function ThreadHeader(props: ThreadHeaderProps) {
  const { convo, name, otherUser, onTogglePin } = props;

  return (
    <div
      style={{
        padding: "12px 20px",
        borderBottom: "1px solid #D4E6F5",
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexShrink: 0,
      }}>
      <div style={{ position: "relative" }}>
        {convo.type === "group" ? (
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: colors.MAGENTA_LIGHT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
            }}>
            👥
          </div>
        ) : (
          <Avatar name={name} size={34} />
        )}
        {convo.type === "direct" && otherUser?.isOnline && (
          <span
            style={{
              position: "absolute",
              bottom: 1,
              right: 1,
              width: 9,
              height: 9,
              background: "#22C55E",
              borderRadius: "50%",
              border: "2px solid #fff",
            }}
          />
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 600,
            fontSize: 15,
            color: "#1A1A1A",
          }}>
          {name}
        </div>
        <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: 12, color: "#1A1A1A" }}>
          {convo.type === "group" ? (
            `${convo.participants.length} members · ${convo.participants.filter((p) => p.isOnline).length} online`
          ) : otherUser?.isOnline ? (
            <span style={{ color: "#22C55E" }}>● Active now</span>
          ) : otherUser?.lastSeenAt ? (
            `Last seen ${formatDmTime(otherUser?.lastSeenAt!)}`
          ) : (
            "Offline"
          )}
        </div>
      </div>
      {/* Mute / pin toggles */}
      {/* <button
        // onClick={() =>
        //   setConvos((cs) => cs.map((c) => (c.id === active.id ? { ...c, isMuted: !c.isMuted } : c)))
        // }
        title={convo.isMuted ? "Unmute" : "Mute"}
        style={{
          width: 28,
          height: 28,
          borderRadius: 7,
          border: "1px solid #C8DCF0",
          background: convo.isMuted ? colors.MAGENTA_LIGHT : "transparent",
          cursor: "pointer",
          fontSize: 13,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        {convo.isMuted ? "🔇" : "🔔"}
      </button> */}
      <button
        onClick={onTogglePin}
        title={convo.isPinned ? "Unpin" : "Pin"}
        style={{
          width: 28,
          height: 28,
          borderRadius: 7,
          border: "1px solid #C8DCF0",
          background: convo.isPinned ? colors.MAGENTA_LIGHT : "transparent",
          cursor: "pointer",
          fontSize: 13,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        📌
      </button>
    </div>
  );
}
