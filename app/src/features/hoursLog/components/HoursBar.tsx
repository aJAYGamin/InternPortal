import colors from "@styles/colors";
import type { HourEntry } from "../types";
import { thisWeek, DAY_LABELS, TODAY } from "../mockData";

interface HoursBarProps {
  entries: HourEntry[];
  viewDate: string;
  setViewDate: (d: string) => void;
}

/**
 * Renders bar column for numbers of hours in the current week
 * - Each bar is also a button to select the `viewDate`
 */
export default function HoursBar({ entries, viewDate, setViewDate }: HoursBarProps) {
  const weekBars = thisWeek.map((date, i) => {
    const total = entries.filter((e) => e.date === date).reduce((s, e) => s + e.hours, 0);
    return { date, label: DAY_LABELS[i] ?? "—", total, isToday: date === TODAY, isSelected: date === viewDate };
  });

  const maxBar = Math.max(...weekBars.map((b) => b.total), 8);

  return (
    <div style={{ padding: "0 20px 14px", display: "flex", gap: 6, alignItems: "flex-end", height: 64 }}>
      {weekBars.map((bar) => (
        <button
          key={bar.date}
          onClick={() => setViewDate(bar.date)}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: 0,
          }}>
          <div style={{ width: "100%", position: "relative", display: "flex", alignItems: "flex-end", height: 40 }}>
            <div
              style={{
                width: "100%",
                borderRadius: "4px 4px 0 0",
                height: bar.total > 0 ? `${Math.round((bar.total / maxBar) * 40)}px` : "3px",
                background: bar.isSelected ? colors.MAGENTA : bar.isToday ? colors.MAGENTA + "55" : "#C8DCF0",
                transition: "height 0.2s, background 0.15s",
              }}
            />
          </div>
          <span
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 12,
              color: bar.isSelected ? colors.MAGENTA : "#1A1A1A",
              fontWeight: bar.isToday ? 700 : 400,
            }}>
            {bar.label}
          </span>
        </button>
      ))}
    </div>
  );
}
