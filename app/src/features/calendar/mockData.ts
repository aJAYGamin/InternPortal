import colors from "@styles/colors";
import type { CalendarEvent } from "./types";

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

export const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

/** Palette offered when colour-coding a new event */
export const EVENT_COLORS = [colors.MAGENTA, colors.SECONDARY, colors.TERTIARY, "#A050A0", "#7BA875", "#3AADA8"]

/** 15-minute interval times: 12:00 AM … 11:45 PM */
export const ALL_TIMES: string[] = []
for (let h = 0; h < 24; h++) {
  for (const m of [0, 15, 30, 45]) {
    const period = h < 12 ? "AM" : "PM"
    const dh = h % 12 === 0 ? 12 : h % 12
    ALL_TIMES.push(`${dh}:${String(m).padStart(2, "0")} ${period}`)
  }
}

const now = new Date()
const THIS_MONTH = now.getMonth()
const THIS_YEAR = now.getFullYear()

export const CALENDAR_EVENTS: CalendarEvent[] = [
  { id: 1, day: 18, month: THIS_MONTH, year: THIS_YEAR, title: "Intern Kickoff — 10am", color: colors.MAGENTA },
  { id: 2, day: 18, month: THIS_MONTH, year: THIS_YEAR, title: "Mentor 1:1 — 2pm", color: colors.TERTIARY },
  { id: 3, day: 21, month: THIS_MONTH, year: THIS_YEAR, title: "Tech Talk: AI at Scale", color: colors.SECONDARY },
  { id: 4, day: 23, month: THIS_MONTH, year: THIS_YEAR, title: "Lunch & Learn", color: colors.TERTIARY },
  { id: 5, day: 25, month: THIS_MONTH, year: THIS_YEAR, title: "Hackathon Registration Deadline", color: colors.MAGENTA },
  { id: 6, day: 28, month: THIS_MONTH, year: THIS_YEAR, title: "Week 2 Standup — 9am", color: colors.SECONDARY },
  { id: 7, day: 30, month: THIS_MONTH, year: THIS_YEAR, title: "Product Demo Day", color: colors.TERTIARY },
]
