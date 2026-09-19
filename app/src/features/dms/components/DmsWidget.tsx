import { useEffect } from "react";
import { useMessageComposer } from "../hooks/useMessageComposer";
import { useHoverMessageId } from "../hooks/useHoverMessageId";
import Card from "@components/Card";
import CardHeader from "@components/CardHeader";

import { useAutoScrollBottom } from "../hooks/useAutoScrollBottom";

import ThreadPanel from "./ThreadPanel";

import { ME_ID } from "../mockData";
import ConversationList from "./ConversationList";
import type { DmUser, DmConversation, DmMessage } from "../types";

interface DmsWidgetProps {
  onExpand?: () => void;
  fullscreen: boolean;
  sortedConvos: DmConversation[];
  activeId: string | null;
  active: DmConversation | null;
  totalUnread: number;
  otherUser: (c: DmConversation) => DmUser;
  convoName: (c: DmConversation) => string;
  openConvo: (id: string) => void;
  sendMessage: (
    text: string,
    opts?: {
      replyToMessageId?: string;
    },
  ) => DmMessage | null;
  toggleReaction: (convoId: string, msgId: string, emoji: string) => void;
  togglePin: (convoId: string) => void;
}

export default function DmsWidget(props: DmsWidgetProps) {
  const {
    activeId,
    otherUser,
    convoName,
    openConvo,
    sendMessage,
    sortedConvos,
    toggleReaction,
    active,
    totalUnread,
    togglePin,
    fullscreen,
    onExpand,
  } = props;

  const { draft, setDraft, replyTo, inputRef, startReply, cancelReply, send } = useMessageComposer(
    sendMessage,
    activeId,
  );

  const { hoveredMsgId, handlersFor } = useHoverMessageId();

  const bottomRef = useAutoScrollBottom(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeId, active?.messages.length]);

  if (!fullscreen) {
    return (
      <Card>
        <CardHeader title="Direct Messages" count={totalUnread > 0 ? totalUnread : undefined} onExpand={onExpand} />
        <ConversationList
          authId={ME_ID}
          activeId={activeId}
          conversations={sortedConvos}
          convoName={convoName}
          fullscreen={fullscreen}
          onSelect={openConvo}
          otherUser={otherUser}
        />
      </Card>
    );
  }

  return (
    <div style={{ display: "flex", height: "100%", minHeight: 480 }}>
      {/* Conversation list */}
      <div
        style={{
          width: 270,
          borderRight: "1px solid #D4E6F5",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}>
        <div style={{ padding: "14px 20px 10px", borderBottom: "1px solid #D4E6F5" }}>
          <span
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 11,
              color: "#1A1A1A",
              letterSpacing: "0.08em",
              fontWeight: 600,
            }}>
            MESSAGES
          </span>
        </div>
        <ConversationList
          authId={ME_ID}
          activeId={activeId}
          conversations={sortedConvos}
          convoName={convoName}
          fullscreen={fullscreen}
          onSelect={openConvo}
          otherUser={otherUser}
        />
      </div>

      <ThreadPanel
        authId={ME_ID}
        active={active}
        name={active ? convoName(active) : ""}
        otherUser={active?.type === "direct" ? otherUser(active) : null}
        // onToggleMute={() => active && toggleMute(active.id)}
        onTogglePin={() => active && togglePin(active.id)}
        hoveredId={hoveredMsgId}
        handlersFor={handlersFor}
        onToggleReaction={(msgId: string, emoji: string) => active && toggleReaction(active.id, msgId, emoji)}
        onReply={startReply}
        bottomRef={bottomRef}
        draft={draft}
        onDraftChange={(text: string) => {
          setDraft(text);
        }}
        onSend={send}
        replyTo={replyTo}
        onCancelReply={cancelReply}
        inputRef={inputRef}
      />
    </div>
  );
}
