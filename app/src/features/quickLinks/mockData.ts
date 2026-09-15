import colors from "@styles/colors";
import type { QuickLink } from "./types";

/**
 * The shortcuts shown in the nav bar.
 *
 * `url` is still a placeholder for every link — drop the real destinations in
 * here and nothing else needs to change.
 */
export const QUICK_LINKS: QuickLink[] = [
  { id: 1, label: "Google Chats", url: "#", icon: "💬", color: colors.MAGENTA },
  { id: 2, label: "GitHub", url: "#", icon: "⬡", color: "#1A1A1A" },
  { id: 3, label: "Claude", url: "#", icon: "✦", color: colors.TERTIARY },
  { id: 4, label: "Figma", url: "#", icon: "◈", color: colors.MAGENTA },
  { id: 5, label: "Canva", url: "#", icon: "🎨", color: colors.TERTIARY },
  { id: 6, label: "Lalaforever", url: "#", icon: "🌐", color: colors.SECONDARY },
  { id: 7, label: "IT Support", url: "#", icon: "🔧", color: colors.SECONDARY },
  { id: 8, label: "Learning", url: "#", icon: "📚", color: colors.TERTIARY },
  { id: 9, label: "Resources", url: "#", icon: "📁", color: colors.MAGENTA },
]
