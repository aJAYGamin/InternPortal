import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import colors from "@styles/colors";
import { buildFullCalendar } from "../hooks";
import { MONTHS } from "../mockData";

interface DateDropdownProps {
  month: number;
  day: number;
  year: number;
  onChange: (month: number, day: number, year: number) => void;
}

const POPUP_H = 310;
const POPUP_W = 272;

const NAV_BTN: React.CSSProperties = {
  width: 26,
  height: 26,
  borderRadius: 6,
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontFamily: "Helvetica, Arial, sans-serif",
  fontSize: 15,
  color: "#1A1A1A",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

/**
 * Renders a date field that opens a month picker, includes:
 * - Year and month navigation
 * - A grid that spills into the neighbouring months, so any date is reachable
 *
 * The picker is rendered through a portal so it is never clipped by the card
 * it sits in, and it flips above the field when there is no room below.
 */
export default function DateDropdown({ month, day, year, onChange }: DateDropdownProps) {
  const [open, setOpen] = useState(false);
  const [calMonth, setCalMonth] = useState(month);
  const [calYear, setCalYear] = useState(year);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const today = new Date();

  /** Positions the picker against the field before showing it */
  function openCal() {
    setCalMonth(month);
    setCalYear(year);

    if (triggerRef.current) {
      const r = triggerRef.current.getBoundingClientRect();
      const openUp = window.innerHeight - r.bottom < POPUP_H + 8;
      const clampedLeft = Math.min(r.left + window.scrollX, window.innerWidth + window.scrollX - POPUP_W - 8);

      setPopupPos({
        top: openUp ? r.top + window.scrollY - POPUP_H - 4 : r.bottom + window.scrollY + 4,
        left: Math.max(8, clampedLeft),
      });
    }

    setOpen(true);
  }

  {/** Closes the picker when the user clicks outside of it */ }
  useEffect(() => {
    if (!open) return;

    function handler(e: MouseEvent) {
      const target = e.target as Node;
      if (triggerRef.current && !triggerRef.current.contains(target)) {
        const popup = document.getElementById("date-dropdown-popup");
        if (!popup || !popup.contains(target)) setOpen(false);
      }
    }

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  function stepMonth(delta: number) {
    const next = calMonth + delta;

    if (next < 0) {
      setCalYear((y) => y - 1);
      setCalMonth(11);
    } else if (next > 11) {
      setCalYear((y) => y + 1);
      setCalMonth(0);
    } else {
      setCalMonth(next);
    }
  }

  const cells = buildFullCalendar(calMonth, calYear);
  const displayDate = `${month + 1}/${day}/${String(year).slice(2)}`;

  const popup = open ? (
    <div
      id="date-dropdown-popup"
      style={{
        position: "absolute",
        top: popupPos.top,
        left: popupPos.left,
        zIndex: 9999,
        background: "#fff",
        border: "1px solid #C8DCF0",
        borderRadius: 12,
        boxShadow: "0 8px 28px rgba(0,0,0,0.13)",
        padding: "14px 14px 12px",
        width: POPUP_W,
      }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: "flex", gap: 1 }}>
          <button onClick={() => setCalYear((y) => y - 1)} title="Previous year" style={NAV_BTN}>
            «
          </button>
          <button onClick={() => stepMonth(-1)} title="Previous month" style={NAV_BTN}>
            ‹
          </button>
        </div>
        <span style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: 14, color: "#1A1A1A" }}>
          {MONTHS[calMonth]} {calYear}
        </span>
        <div style={{ display: "flex", gap: 1 }}>
          <button onClick={() => stepMonth(1)} title="Next month" style={NAV_BTN}>
            ›
          </button>
          <button onClick={() => setCalYear((y) => y + 1)} title="Next year" style={NAV_BTN}>
            »
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 4 }}>
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div
            key={i}
            style={{
              textAlign: "center",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 11,
              color: "#1A1A1A",
              fontWeight: 500,
              padding: "2px 0",
            }}>
            {d}
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px 0" }}>
        {cells.map((cell) => {
          const isToday =
            cell.day === today.getDate() && cell.month === today.getMonth() && cell.year === today.getFullYear();
          const isSelected = cell.day === day && cell.month === month && cell.year === year;

          return (
            <button
              key={`${cell.year}-${cell.month}-${cell.day}`}
              onClick={() => {
                onChange(cell.month, cell.day, cell.year);
                setOpen(false);
              }}
              style={{
                width: "100%",
                aspectRatio: "1",
                borderRadius: "50%",
                border: isToday && !isSelected ? `1.5px solid ${colors.MAGENTA}` : "1.5px solid transparent",
                background: isSelected ? colors.MAGENTA : "transparent",
                color: isSelected ? "#fff" : cell.current ? "#1A1A1A" : "#C0B0C0",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: 13,
                fontWeight: isToday || isSelected ? 700 : 400,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.1s",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) e.currentTarget.style.background = colors.MAGENTA_LIGHT;
              }}
              onMouseLeave={(e) => {
                if (!isSelected) e.currentTarget.style.background = "transparent";
              }}>
              {cell.day}
            </button>
          );
        })}
      </div>
    </div>
  ) : null;

  return (
    <div style={{ position: "relative", flex: 1 }}>
      <div
        style={{
          height: 40,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          border: `1px solid ${open ? colors.MAGENTA : "#C8DCF0"}`,
          borderRadius: 8,
          background: "#fff",
          transition: "border-color 0.15s",
        }}>
        <button
          ref={triggerRef}
          onClick={() => (open ? setOpen(false) : openCal())}
          style={{
            flex: 1,
            height: "100%",
            padding: "0 12px",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            textAlign: "left",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 14,
            color: "#1A1A1A",
          }}>
          {displayDate}
        </button>
      </div>
      {popup && createPortal(popup, document.body)}
    </div>
  );
}
