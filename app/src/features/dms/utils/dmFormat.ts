import type { DmUser } from "../types";

/** "3:45 PM" for today, "Jun 12" otherwise. */
export function formatDmTime(iso: string): string {
  const d = new Date(iso);
  const now = new Date();

  const isToday = d.toDateString() === now.toDateString();

  return isToday
    ? d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    : d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function senderDisplayName(senderId: string, usersById: Record<string, DmUser>): string {
  return usersById[senderId]?.displayName ?? senderId;
}

export const QUICK_REACTIONS = ["👍", "❤️", "😂", "🎉", "🙏"] as const;