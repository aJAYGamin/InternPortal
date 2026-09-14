import { useState, useRef, useEffect } from "react";
import colors from "@styles/colors";
import ChevronIcon from "@icons/ChevronIcon";
import { ALL_TIMES } from "../mockData";

interface TimeDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Renders a time field, includes:
 * - A scrollable list of 15-minute intervals, scrolled to the current value
 * - Free typing, so "9", "9:30", "930pm" all resolve to a valid time
 */
export default function TimeDropdown({ value, onChange }: TimeDropdownProps) {
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const [focused, setFocused] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedIdx = ALL_TIMES.indexOf(value);
  const isOpen = open || focused;

  {/** Brings the selected time into view whenever the list opens */ }
  useEffect(() => {
    if (!isOpen || !listRef.current) return;

    const item = listRef.current.querySelector("[data-selected='true']");
    if (item) item.scrollIntoView({ block: "center" });
  }, [isOpen]);

  {/** Closes the list when the user clicks outside of it */ }
  useEffect(() => {
    if (!isOpen) return;

    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setFocused(false);
        setTyped("");
      }
    }

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  function close() {
    setOpen(false);
    setFocused(false);
    setTyped("");
  }

  /** Parses what the user typed — "9", "9:30", "9:30 AM", "930", "930pm" — into a time */
  function commitTyped() {
    const raw = typed.trim();

    if (raw) {
      const match = raw.match(/^(\d{1,2}):?(\d{2})?\s*(am|pm)?$/i);

      if (match) {
        let h = parseInt(match[1]);
        const m = match[2] ? parseInt(match[2]) : 0;
        const suffix = match[3] ? match[3].toUpperCase() : h < 12 ? "AM" : "PM";

        if (h === 0) h = 12;
        if (h > 12) h = h % 12 || 12;

        onChange(`${h}:${String(m).padStart(2, "0")} ${suffix}`);
      }
    }

    close();
  }

  function select(time: string) {
    onChange(time);
    close();
  }

  return (
    <div ref={containerRef} style={{ position: "relative", flex: 1 }}>
      <div
        style={{
          height: 40,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          border: `1px solid ${isOpen ? colors.MAGENTA : "#C8DCF0"}`,
          borderRadius: 8,
          background: "#fff",
          transition: "border-color 0.15s",
        }}>
        <input
          ref={inputRef}
          value={focused ? typed : value}
          onChange={(e) => setTyped(e.target.value)}
          onFocus={() => {
            setFocused(true);
            setTyped("");
          }}
          onBlur={commitTyped}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              commitTyped();
              e.preventDefault();
            }
            if (e.key === "Escape") close();
          }}
          placeholder="9:00 AM"
          style={{
            flex: 1,
            padding: "0 10px",
            border: "none",
            outline: "none",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 14,
            color: "#1A1A1A",
            background: "transparent",
            minWidth: 0,
            height: "100%",
          }}
        />
        <button
          title="Show times"
          onMouseDown={(e) => {
            // Keeps the input from blurring, which would close the list again
            e.preventDefault();

            if (isOpen) {
              setOpen(false);
              setFocused(false);
            } else {
              setOpen(true);
              inputRef.current?.focus();
            }
          }}
          style={{
            padding: "0 10px",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
            color: "#1A1A1A",
          }}>
          <ChevronIcon flipped={isOpen} />
        </button>
      </div>

      {isOpen && (
        <div
          ref={listRef}
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            zIndex: 50,
            background: "#fff",
            border: "1px solid #C8DCF0",
            borderRadius: 10,
            boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
            maxHeight: 220,
            overflowY: "auto",
          }}>
          {ALL_TIMES.map((t, i) => {
            const isSelected = i === selectedIdx;

            return (
              <div
                key={t}
                role="button"
                tabIndex={-1}
                data-selected={isSelected ? "true" : "false"}
                onMouseDown={(e) => {
                  e.preventDefault();
                  select(t);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "9px 14px 9px 12px",
                  borderLeft: isSelected ? `3px solid ${colors.MAGENTA}` : "3px solid transparent",
                  background: isSelected ? colors.MAGENTA_LIGHT : "transparent",
                  cursor: "pointer",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontSize: 14,
                  fontWeight: isSelected ? 600 : 400,
                  color: isSelected ? colors.MAGENTA : "#1A1A1A",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.background = colors.MAGENTA_LIGHT;
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.background = "transparent";
                }}>
                <span>{t}</span>
                {isSelected && (
                  <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                    <path
                      d="M1 5L5.5 9.5L13 1"
                      stroke={colors.MAGENTA}
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
