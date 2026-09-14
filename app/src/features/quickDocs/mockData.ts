import type { Doc } from "./types";

export const DOC_TYPES = ["Doc", "PDF", "Form", "Sheet", "Slide"]

export const QUICK_DOCS: Doc[] = [
  { id: 1, title: "Intern Onboarding Guide", url: "#", updatedAt: "Jul 17", type: "PDF" },
  { id: 2, title: "Code Style & Review Guidelines", url: "#", updatedAt: "Jul 10", type: "Doc" },
  { id: 3, title: "Expense Reimbursement Policy", url: "#", updatedAt: "Jun 30", type: "PDF" },
  { id: 4, title: "PTO & Time Off Request Form", url: "#", updatedAt: "Jun 15", type: "Form" },
  { id: 5, title: "IT Setup Checklist", url: "#", updatedAt: "Jul 1", type: "Doc" },
]
