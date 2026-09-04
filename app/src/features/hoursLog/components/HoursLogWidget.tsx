import { useState } from "react";
import type { HourEntry } from "../types";
import { TODAY, thisWeek } from "../mockData";
import Card from "@components/Card";
import CardHeader from "@components/CardHeader";
import colors from "@styles/colors";
import PostHoursLog from "./PostHoursLog";
import HoursBar from "./HoursBar";
import HoursEntry from "./HoursEntry";

/** Renders hours log tab, include
 * - Hours bar of this week
 * - Display the hours log of selected day
 * - Add new log
 */
interface HoursLogWidgetProps {
  entries: HourEntry[];
  addEntries: (description: string, hours: string, project: string, viewDate: string) => boolean;
  onExpand?: () => void;
  onClose?: () => void;
}

export default function HoursLogWidget({ entries, addEntries, onExpand, onClose }: HoursLogWidgetProps) {
  const [viewDate, setViewDate] = useState(TODAY);

  const todayEntries = entries.filter((e) => e.date === viewDate);
  const todayTotal = todayEntries.reduce((s, e) => s + e.hours, 0);
  const weekTotal = entries.filter((e) => thisWeek.includes(e.date)).reduce((s, e) => s + e.hours, 0);

  function logHours(description: string, hours: string, project: string) {
    return addEntries(description, hours, project, viewDate);
  }

  return (
    <Card>
      <CardHeader
        title="Hours Log"
        onExpand={onExpand}
        onClose={onClose}
        action={
          <span
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 12,
              color: colors.MAGENTA,
              fontWeight: 600,
            }}>
            {weekTotal.toFixed(1)}h this week
          </span>
        }
      />

      <HoursBar entries={entries} viewDate={viewDate} setViewDate={setViewDate} />

      {/* Selected day entries */}
      <div style={{ borderTop: "1px solid #D4E6F5", padding: "10px 20px 0" }}>
        {/** Date display + number of hours  */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <span
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 12,
              color: "#1A1A1A",
              letterSpacing: "0.06em",
            }}>
            {new Date(viewDate + "T12:00:00")
              .toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })
              .toUpperCase()}
          </span>
          <span
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 12,
              color: colors.MAGENTA,
              fontWeight: 600,
            }}>
            {todayTotal.toFixed(1)}h
          </span>
        </div>

        {!todayEntries.length ? (
          <div
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 14,
              color: "#1A1A1A",
              padding: "8px 0 12px",
              textAlign: "center",
            }}>
            No hours logged for this day
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 12 }}>
            {todayEntries.map((e) => (
              <HoursEntry entry={e} key={e.id} />
            ))}
          </div>
        )}
      </div>

      <PostHoursLog logHours={logHours} />
    </Card>
  );
}
