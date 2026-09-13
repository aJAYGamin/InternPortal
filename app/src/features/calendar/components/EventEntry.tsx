import colors from "@styles/colors";
import type { CalendarEvent } from "../types";

interface EventEntryProps {
  event: CalendarEvent;
  removeEvent: (id: number) => void;
}

/** Renders one event row: its colour bar, title and remove button */
export default function EventEntry({ event, removeEvent }: EventEntryProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 3, height: 28, borderRadius: 2, background: event.color, flexShrink: 0 }} />
      <span style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: 14, color: "#1A1A1A", flex: 1 }}>
        {event.title}
      </span>
      <button
        onClick={() => removeEvent(event.id)}
        title="Remove event"
        style={{
          border: "none",
          background: "transparent",
          color: "#1A1A1A",
          cursor: "pointer",
          fontSize: 16,
          lineHeight: 1,
          padding: "0 2px",
          borderRadius: 4,
          transition: "color 0.1s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = colors.MAGENTA)}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#1A1A1A")}>
        ×
      </button>
    </div>
  );
}
