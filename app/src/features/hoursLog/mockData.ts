import type { HourEntry } from "./types";

export const TODAY = new Date().toISOString().slice(0, 10);

export const thisWeek = Array.from({ length: 5 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - (d.getDay() === 0 ? 6 : d.getDay() - 1) + i);

  return d.toISOString().slice(0, 10);
});

export const INITIAL_HOURS: HourEntry[] = [
  { id: 1, date: thisWeek[0], project: "Onboarding", description: "Completed HR paperwork and IT setup", hours: 3 },
  { id: 2, date: thisWeek[0], project: "Team Meetings", description: "Intern kickoff session", hours: 1.5 },
  { id: 3, date: thisWeek[1], project: "Engineering", description: "Reviewed codebase and style guidelines", hours: 4 },
  { id: 4, date: thisWeek[1], project: "Team Meetings", description: "Mentor 1:1 intro call", hours: 0.5 },
  { id: 5, date: TODAY, project: "Engineering", description: "Set up local dev environment", hours: 2.5 },
]

export const PROJECTS = ["Engineering", "Design", "Product", "Research", "Onboarding", "Team Meetings", "Admin", "Other"]

export const DAY_LABELS: Record<string, string> = { 0: "Mon", 1: "Tue", 2: "Wed", 3: "Thu", 4: "Fri" }