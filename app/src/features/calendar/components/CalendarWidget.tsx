import { useMemo, useState } from "react";
import Card from "@components/Card";
import CardHeader from "@components/CardHeader";
import colors from "@styles/colors";
import CalendarGrid from "./CalendarGrid";
import EventEntry from "./EventEntry";
import NewEventForm from "./NewEventForm";
import { useCalendarView, useNewEventForm } from "../hooks";
import { MONTHS } from "../mockData";
import type { CalendarStore } from "../types";

interface CalendarWidgetProps {
  calendarStore: CalendarStore;
  onExpand?: () => void;
  onClose?: () => void;
}

const NAV_BTN: React.CSSProperties = {
  width: 26,
  height: 26,
  borderRadius: 6,
  border: "1px solid #C8DCF0",
  background: "transparent",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#1A1A1A",
  fontSize: 16,
  transition: "background 0.1s",
};

/**
 * Renders the calendar widget, includes:
 * - Month grid with month navigation
 * - Events for the selected day
 * - Add and remove events
 */
export default function CalendarWidget({ calendarStore, onExpand, onClose }: CalendarWidgetProps) {
  const { events, addEvent, removeEvent } = calendarStore;
  const { viewYear, viewMonth, selectedDay, selectDay, setSelectedDay, prevMonth, nextMonth, cells, isCurrentMonth, today } =
    useCalendarView();
  const [adding, setAdding] = useState(false);
  const form = useNewEventForm();

  const monthEvents = useMemo(
    () => events.filter((e) => e.month === viewMonth && e.year === viewYear),
    [events, viewMonth, viewYear],
  );
  const dayEvents = useMemo(
    () => (selectedDay ? monthEvents.filter((e) => e.day === selectedDay) : []),
    [monthEvents, selectedDay],
  );

  /** Opens the form, pointed at the given day when one is selected */
  function openForm(day: number | null) {
    if (day) form.openOn(viewMonth, day, viewYear);
    setAdding(true);
  }

  function post() {
    const newEvent = form.buildEvent();

    // stop when the event is invalid
    if (!newEvent) return;

    addEvent(newEvent);
    form.reset();
    setAdding(false);

    // follow the event if it was filed on another day of the month in view
    if (newEvent.month === viewMonth && newEvent.year === viewYear) setSelectedDay(newEvent.day);
  }

  function stepMonth(step: () => void) {
    step();
    setAdding(false);
  }

  const addButton = (
    <button
      onClick={() => (adding ? setAdding(false) : openForm(selectedDay))}
      style={{
        padding: "3px 10px",
        borderRadius: 6,
        border: `1px solid ${adding ? colors.MAGENTA : "#C8DCF0"}`,
        background: adding ? colors.MAGENTA_LIGHT : "transparent",
        color: adding ? colors.MAGENTA : "#1A1A1A",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontSize: 12,
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.15s",
      }}>
      {adding ? "Cancel" : "+ Add event"}
    </button>
  );

  return (
    <Card>
      <CardHeader
        title={`${MONTHS[viewMonth]} ${viewYear}`}
        onExpand={onExpand}
        onClose={onClose}
        action={
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <button
              onClick={() => stepMonth(prevMonth)}
              title="Previous month"
              style={NAV_BTN}
              onMouseEnter={(e) => (e.currentTarget.style.background = colors.MAGENTA_LIGHT)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
              ‹
            </button>
            <button
              onClick={() => stepMonth(nextMonth)}
              title="Next month"
              style={NAV_BTN}
              onMouseEnter={(e) => (e.currentTarget.style.background = colors.MAGENTA_LIGHT)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
              ›
            </button>
          </div>
        }
      />

      <CalendarGrid
        cells={cells}
        events={monthEvents}
        selectedDay={selectedDay}
        selectDay={(day) => {
          selectDay(day);
          setAdding(false);
        }}
        isCurrentMonth={isCurrentMonth}
        today={today}
      />

      {/* Events panel */}
      <div style={{ padding: "10px 20px 6px", borderTop: "1px solid #D4E6F5" }}>
        {selectedDay ? (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <span
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontSize: 12,
                  color: "#1A1A1A",
                  letterSpacing: "0.06em",
                }}>
                {MONTHS[viewMonth].toUpperCase()} {selectedDay}
              </span>
              {addButton}
            </div>

            {adding && <NewEventForm form={form} post={post} />}

            {dayEvents.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 12 }}>
                {dayEvents.map((ev) => (
                  <EventEntry key={ev.id} event={ev} removeEvent={removeEvent} />
                ))}
              </div>
            ) : (
              !adding && (
                <div
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontSize: 14,
                    color: "#1A1A1A",
                    paddingBottom: 12,
                  }}>
                  No events — add one above
                </div>
              )
            )}
          </>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: adding ? 8 : 12,
              }}>
              <span style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: 14, color: "#1A1A1A" }}>
                Select a day to view events
              </span>
              {addButton}
            </div>
            {adding && <NewEventForm form={form} post={post} />}
          </>
        )}
      </div>
    </Card>
  );
}
