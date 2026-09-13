import colors from "@styles/colors";
import { DAYS } from "../mockData";
import type { CalendarEvent, MonthCell } from "../types";

interface CalendarGridProps {
  cells: MonthCell[];
  events: CalendarEvent[];
  selectedDay: number | null;
  selectDay: (day: number) => void;
  isCurrentMonth: boolean;
  today: Date;
}

/**
 * Renders the month grid
 * - Each day is a button that selects the day shown in the events panel
 * - A dot marks days that already have events
 */
export default function CalendarGrid({ cells, events, selectedDay, selectDay, isCurrentMonth, today }: CalendarGridProps) {
  return (
    <div style={{ padding: "0 16px 6px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 4 }}>
        {DAYS.map((d) => (
          <div
            key={d}
            style={{
              textAlign: "center",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 12,
              color: "#1A1A1A",
              letterSpacing: "0.06em",
              padding: "2px 0",
            }}>
            {d}
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px 0" }}>
        {cells.map((day, i) => {
          if (!day) return <div key={`pad-${i}`} />;

          const isToday = isCurrentMonth && day === today.getDate();
          const isSelected = day === selectedDay;
          const hasEvent = events.some((e) => e.day === day);

          return (
            <button
              key={day}
              onClick={() => selectDay(day)}
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1",
                borderRadius: 7,
                border: "none",
                cursor: "pointer",
                background: isSelected ? colors.MAGENTA : isToday ? colors.MAGENTA_LIGHT : "transparent",
                color: isSelected ? "#fff" : isToday ? colors.MAGENTA : "#1A1A1A",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: isToday ? 700 : 400,
                fontSize: 14,
                transition: "background 0.1s",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                if (!isSelected && !isToday) e.currentTarget.style.background = colors.MAGENTA_LIGHT;
              }}
              onMouseLeave={(e) => {
                if (!isSelected && !isToday) e.currentTarget.style.background = "transparent";
              }}>
              {day}
              {hasEvent && (
                <span
                  style={{
                    position: "absolute",
                    bottom: 3,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: isSelected ? "rgba(255,255,255,0.7)" : colors.MAGENTA,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
