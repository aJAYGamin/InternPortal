import type { DmConversation, DmMessage, MessageStatus, MessageReaction } from "../types";

export function buildMessage(
  senderId: string,
  text: string,
  opts?: { replyToMessageId?: string; status?: MessageStatus }): DmMessage {

  return {
    id: `m${Date.now()}`,
    senderId,
    contentType: "text",
    text: text.trim(),
    status: opts?.status ?? "sending",
    createdAt: new Date().toISOString(),
    replyToMessageId: opts?.replyToMessageId
  };
}

export function appendMessage(convo: DmConversation, msg: DmMessage): DmConversation {
  return { ...convo, messages: [...convo.messages, msg], updatedAt: new Date().toISOString() };
}

export function updateMessageStatus(convo: DmConversation, msgId: string, status: MessageStatus): DmConversation {
  return {
    ...convo,
    messages: convo.messages.map(msg => msg.id === msgId ? { ...msg, status } : msg)
  };
}

function toggleReactionOnList(
  reactions: MessageReaction[] | undefined,
  emoji: string,
  userId: string,
): MessageReaction[] {
  const list = reactions ?? [];
  const existing = list.find((r) => r.emoji === emoji);

  if (!existing) {
    return [...list, { emoji, userIds: [userId], count: 1 }];
  }

  const hasUser = existing.userIds.includes(userId);

  return list
    .map((r) =>
      r.emoji !== emoji
        ? r
        : {
          ...r,
          userIds: hasUser ? r.userIds.filter((id) => id !== userId) : [...r.userIds, userId],
          count: hasUser ? r.count - 1 : r.count + 1,
        },
    )
    .filter((r) => r.count > 0);
}

export function toggleMessageReaction(convo: DmConversation, msgId: string, emoji: string, userId: string): DmConversation {
  return {
    ...convo,
    messages: convo.messages.map(msg => msg.id === msgId
      ? { ...msg, reactions: toggleReactionOnList(msg.reactions, emoji, userId) }
      : msg
    )
  };
}