import type { Todo } from "./types"

// Team roster is shared with other features (calendar sharing), see src/data/team.ts
export { authUser, TEAM_MEMBERS } from "../../data/team"
import { authUser } from "../../data/team"

export const INITIAL_TODOS: Todo[] = [
  { id: 1, text: "Complete onboarding paperwork in HR portal", done: true, author: "HR Team", assignee: authUser, priority: "high", delegated: true },
  { id: 2, text: "Set up dev environment using IT Setup Guide", done: true, author: "IT Support", assignee: authUser, priority: "high", delegated: true },
  { id: 3, text: "Introduce yourself in #internship-2026 Slack channel", done: false, author: authUser, assignee: authUser, priority: "medium", delegated: false },
  { id: 4, text: "Schedule 1:1 with your mentor this week", done: false, author: "Program Lead", assignee: authUser, priority: "high", delegated: true },
  { id: 5, text: "Review the Code Style Guidelines doc", done: false, author: "Eng Team", assignee: authUser, priority: "medium", delegated: true },
  { id: 6, text: "Register for the Summer Hackathon by July 25", done: false, author: authUser, assignee: authUser, priority: "low", delegated: false },
  { id: 7, text: "Submit week 1 check-in form", done: false, author: "Program Lead", assignee: authUser, priority: "medium", delegated: true },
  { id: 8, text: "Send onboarding doc to new interns", done: false, author: authUser, assignee: "Maya R.", priority: "medium", delegated: true },
  { id: 9, text: "Book team lunch for Friday", done: false, author: authUser, assignee: "Priya K.", priority: "low", delegated: true },
]

