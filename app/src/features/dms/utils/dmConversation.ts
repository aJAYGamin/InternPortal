import type { DmConversation, DmUser } from "../types";

export function updateConversationById(
  convos: DmConversation[],
  id: string,
  updater: (c: DmConversation) => DmConversation
) {
  return convos.map(c => c.id === id ? updater(c) : c);
}

export function sortConversations(convos: DmConversation[]): DmConversation[] {
  return [...convos].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

export function getOtherUser(c: DmConversation, authId: string): DmUser {
  return c.participants.find(p => p.id != authId) ?? c.participants[0];
}

export function getConvoDisplayName(c: DmConversation, authId: string): string {
  return c.type === "group" ? (c.title ?? "Group") : getOtherUser(c, authId).displayName
}