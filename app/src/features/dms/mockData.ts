import type { DmUser, DmConversation } from "./types"

export const ME_ID = "jordan"

export const DM_USERS: Record<string, DmUser> = {
  jordan: { id: "jordan", displayName: "Jordan Lee", isOnline: true },
  maya: { id: "maya", displayName: "Maya R.", isOnline: true },
  lead: { id: "lead", displayName: "Program Lead", isOnline: false, lastSeenAt: "2026-07-18T08:31:00Z" },
  priya: { id: "priya", displayName: "Priya K.", isOnline: true },
  dev: { id: "dev", displayName: "Dev S.", isOnline: false, lastSeenAt: "2026-07-16T15:00:00Z" },
  chris: { id: "chris", displayName: "Chris T.", isOnline: true },
  fatima: { id: "fatima", displayName: "Fatima A.", isOnline: false },
}

export const INITIAL_DMS: DmConversation[] = [
  {
    id: "1", type: "direct", isPinned: true,
    participants: [DM_USERS.jordan, DM_USERS.maya],
    unreadCount: 2, updatedAt: "2026-07-18T09:24:00Z",
    messages: [
      { id: "m1", senderId: "maya", contentType: "text", text: "Hey! Did you get a chance to look at the onboarding doc I shared?", status: "read", createdAt: "2026-07-18T09:14:00Z" },
      { id: "m2", senderId: "jordan", contentType: "text", text: "Just opened it — looks really thorough, thanks!", status: "read", createdAt: "2026-07-18T09:22:00Z" },
      { id: "m3", senderId: "maya", contentType: "text", text: "Let me know if anything is unclear. Also are you going to the kickoff today?", status: "read", createdAt: "2026-07-18T09:23:00Z", reactions: [{ emoji: "👍", userIds: ["jordan"], count: 1 }] },
      { id: "m4", senderId: "maya", contentType: "text", text: "It starts at 10 in the Atrium 👋", status: "delivered", createdAt: "2026-07-18T09:24:00Z" },
    ],
  },
  {
    id: "2", type: "direct",
    participants: [DM_USERS.jordan, DM_USERS.lead],
    unreadCount: 1, updatedAt: "2026-07-18T08:31:00Z",
    messages: [
      { id: "m5", senderId: "lead", contentType: "text", text: "Welcome to the cohort, Jordan! Your mentor is Priya K. — she'll reach out shortly.", status: "read", createdAt: "2026-07-18T08:05:00Z" },
      { id: "m6", senderId: "jordan", contentType: "text", text: "Thank you so much, really excited to be here!", status: "read", createdAt: "2026-07-18T08:30:00Z" },
      { id: "m7", senderId: "lead", contentType: "text", text: "Don't forget to submit your week 1 check-in by Friday. Link is in the portal.", status: "delivered", createdAt: "2026-07-18T08:31:00Z" },
    ],
  },
  {
    id: "3", type: "direct",
    participants: [DM_USERS.jordan, DM_USERS.priya],
    unreadCount: 0, updatedAt: "2026-07-17T14:00:00Z",
    messages: [
      { id: "m8", senderId: "priya", contentType: "text", text: "Hi Jordan! I'm your mentor. When works for a quick intro call this week?", status: "read", createdAt: "2026-07-17T10:00:00Z" },
      { id: "m9", senderId: "jordan", contentType: "text", text: "Hi Priya! Wednesday afternoon works great for me.", status: "read", createdAt: "2026-07-17T10:15:00Z" },
      { id: "m10", senderId: "priya", contentType: "text", text: "Perfect, I'll send a calendar invite for 2pm.", status: "read", createdAt: "2026-07-17T10:18:00Z", reactions: [{ emoji: "🎉", userIds: ["jordan"], count: 1 }] },
    ],
  },
  {
    id: "4", type: "direct",
    participants: [DM_USERS.jordan, DM_USERS.dev],
    unreadCount: 0, updatedAt: "2026-07-16T15:05:00Z",
    messages: [
      { id: "m11", senderId: "jordan", contentType: "text", text: "Hey Dev, are you registering for the hackathon?", status: "read", createdAt: "2026-07-16T14:50:00Z" },
      { id: "m12", senderId: "dev", contentType: "text", text: "Yes! Want to team up? I was thinking something around ML infra.", status: "read", createdAt: "2026-07-16T14:55:00Z" },
      { id: "m13", senderId: "jordan", contentType: "text", text: "That sounds awesome, let's do it!", status: "read", createdAt: "2026-07-16T15:05:00Z" },
    ],
  },
  {
    id: "5", type: "group", title: "Hackathon Squad",
    participants: [DM_USERS.jordan, DM_USERS.dev, DM_USERS.chris, DM_USERS.fatima],
    unreadCount: 3, updatedAt: "2026-07-18T09:00:00Z",
    messages: [
      { id: "m14", senderId: "dev", contentType: "text", text: "Alright squad — let's brainstorm ideas tonight!", status: "read", createdAt: "2026-07-18T08:45:00Z" },
      { id: "m15", senderId: "chris", contentType: "text", text: "I'm thinking real-time intern analytics dashboard 📊", status: "read", createdAt: "2026-07-18T08:50:00Z" },
      { id: "m16", senderId: "fatima", contentType: "text", text: "Love that. We could use the public GitHub API for activity data.", status: "read", createdAt: "2026-07-18T08:58:00Z" },
      { id: "m17", senderId: "dev", contentType: "text", text: "Jordan — you in? We need a frontend lead 👀", status: "delivered", createdAt: "2026-07-18T09:00:00Z" },
    ],
  },
]