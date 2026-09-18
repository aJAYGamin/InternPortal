export interface DmUser {
  id: string
  displayName: string
  isOnline?: boolean
  lastSeenAt?: string
}

export type MessageStatus = "sending" | "sent" | "delivered" | "read" | "failed"
type MessageContentType = "text" | "system"

export interface MessageReaction {
  emoji: string
  userIds: string[]
  count: number
}

export interface DmMessage {
  id: string
  senderId: string
  contentType: MessageContentType
  text?: string
  replyToMessageId?: string
  reactions?: MessageReaction[]
  status: MessageStatus
  createdAt: string
  isEdited?: boolean
  isDeleted?: boolean
}

export type ConversationType = "direct" | "group"

export interface DmConversation {
  id: string
  type: ConversationType
  title?: string
  participants: DmUser[]
  messages: DmMessage[]
  unreadCount: number
  isPinned?: boolean
  isMuted?: boolean
  updatedAt: string
}