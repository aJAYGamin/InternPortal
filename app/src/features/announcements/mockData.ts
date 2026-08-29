import type { Announcement } from "./types"

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    title: "Welcome to the 2026 Summer Internship Cohort!",
    body: "We're thrilled to have 48 interns joining us across Engineering, Design, Product, and Data Science. Your kickoff session is today at 10am in the Atrium.",
    date: "Jul 18",
    tag: "Welcome",
    pinned: true,
  },
  {
    id: 2,
    title: "New Benefits Portal — Action Required",
    body: "Our HR benefits platform has migrated. Please log in at benefits.company.com and re-confirm your elections by July 31. Reach out to hr@company.com with questions.",
    date: "Jul 16",
    tag: "HR",
  },
  {
    id: 3,
    title: "Summer Hackathon — Register by July 25",
    body: "Form teams of 2-4 and register via the hackathon link in Quick Links. Projects will be demoed on August 8. Prizes include $500 in tech credits per team.",
    date: "Jul 15",
    tag: "Events",
  },
  {
    id: 4,
    title: "Office Closure — July 4th Holiday",
    body: "All offices will be closed Friday, July 4th in observance of Independence Day. Remote teams should plan accordingly. The office reopens Monday, July 7th.",
    date: "Jun 28",
    tag: "Operations",
  },
]