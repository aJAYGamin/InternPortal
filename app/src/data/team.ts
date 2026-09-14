/**
 * Shared team roster.
 *
 * `authUser` and `TEAM_MEMBERS` are used by more than one feature (to-do
 * delegation, calendar event sharing), so they live here rather than inside a
 * single feature's mock data.
 */
export const authUser = "Jordan Lee";

export const TEAM_MEMBERS = [
  authUser,
  "Maya R.",
  "Dev S.",
  "Priya K.",
  "Chris T.",
  "Fatima A.",
  "HR Team",
  "IT Support",
  "Program Lead",
  "Eng Team",
  "Events Team",
];
