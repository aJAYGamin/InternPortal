import colors from "@styles/colors";
import DateDropdown from "./DateDropdown";
import TimeDropdown from "./TimeDropdown";
import { EVENT_COLORS } from "../mockData";
import { authUser, TEAM_MEMBERS } from "../../../data/team";
import type { RepeatEnds, RepeatFreq } from "../types";
import type { useNewEventForm } from "../hooks";

interface NewEventFormProps {
  form: ReturnType<typeof useNewEventForm>;
  post: () => void;
}

const FREQ_OPTIONS: { id: RepeatFreq; label: string }[] = [
  { id: "daily", label: "Daily" },
  { id: "weekly", label: "Weekly" },
  { id: "monthly", label: "Monthly" },
  { id: "yearly", label: "Yearly" },
];

const END_OPTIONS: RepeatEnds[] = ["never", "on", "after"];

const FIELD_BOX: React.CSSProperties = {
  height: 40,
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  border: "1px solid #C8DCF0",
  borderRadius: 8,
  background: "#fff",
};

const LABEL: React.CSSProperties = {
  fontFamily: "Helvetica, Arial, sans-serif",
  fontSize: 12,
  color: "#1A1A1A",
  fontWeight: 600,
  marginBottom: 4,
};

const TEXT: React.CSSProperties = {
  fontFamily: "Helvetica, Arial, sans-serif",
  fontSize: 13,
  color: "#1A1A1A",
};

const SELECT: React.CSSProperties = {
  padding: "7px 10px",
  borderRadius: 7,
  border: "1px solid #C8DCF0",
  fontFamily: "Helvetica, Arial, sans-serif",
  fontSize: 14,
  color: "#1A1A1A",
  background: "#fff",
  outline: "none",
  cursor: "pointer",
  appearance: "none",
  WebkitAppearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%234A6B8A' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 10px center",
  paddingRight: 28,
  width: "100%",
  boxSizing: "border-box",
};

/**
 * Renders the input form for a new event, includes:
 * - title
 * - start and end date + time
 * - repeat toggle, frequency pills and end condition
 * - colour swatches
 * - teammate to share the event with
 */
export default function NewEventForm({ form, post }: NewEventFormProps) {
  return (
    <div
      style={{
        marginBottom: 10,
        padding: 14,
        borderRadius: 10,
        background: colors.MAGENTA_LIGHT,
        border: `1px solid ${colors.MAGENTA}33`,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        boxSizing: "border-box",
        width: "100%",
        overflow: "hidden",
      }}>
      {/* Title */}
      <div style={{ ...FIELD_BOX, width: "100%", borderRadius: 7 }}>
        <input
          value={form.title}
          onChange={(e) => form.setTitle(e.target.value)}
          placeholder="Event title…"
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            padding: "0 10px",
            border: "none",
            outline: "none",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 14,
            color: "#1A1A1A",
            background: "transparent",
          }}
        />
      </div>

      {/* Start */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={LABEL}>Start</div>
        <div style={{ display: "flex", gap: 6, minWidth: 0 }}>
          <DateDropdown
            month={form.startMonth}
            day={form.startDay}
            year={form.startYear}
            onChange={(m, d, y) => {
              form.setStartMonth(m);
              form.setStartDay(d);
              form.setStartYear(y);
            }}
          />
          <TimeDropdown value={form.startTime} onChange={form.setStartTime} />
        </div>
      </div>

      {/* End */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={LABEL}>End</div>
        <div style={{ display: "flex", gap: 6, minWidth: 0 }}>
          <DateDropdown
            month={form.endMonth}
            day={form.endDay}
            year={form.endYear}
            onChange={(m, d, y) => {
              form.setEndMonth(m);
              form.setEndDay(d);
              form.setEndYear(y);
            }}
          />
          <TimeDropdown value={form.endTime} onChange={form.setEndTime} />
        </div>
      </div>

      {/* Repeat */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <button
          onClick={() => form.setRepeat(!form.repeat)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 0,
            width: "fit-content",
          }}>
          <div
            style={{
              width: 36,
              height: 20,
              borderRadius: 10,
              background: form.repeat ? colors.MAGENTA : "#D0C0D0",
              position: "relative",
              transition: "background 0.2s",
              flexShrink: 0,
            }}>
            <div
              style={{
                position: "absolute",
                top: 2,
                left: form.repeat ? 18 : 2,
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "#fff",
                transition: "left 0.2s",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
            />
          </div>
          <span style={{ ...TEXT, fontWeight: 600 }}>Repeat event</span>
        </button>

        {form.repeat && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              padding: "10px 12px",
              background: "#fff",
              borderRadius: 8,
              border: "1px solid #C8DCF0",
            }}>
            {/* Frequency */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {FREQ_OPTIONS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => form.setRepeatFreq(f.id)}
                  style={{
                    padding: "4px 12px",
                    borderRadius: 20,
                    border: `1.5px solid ${form.repeatFreq === f.id ? colors.MAGENTA : "#C8DCF0"}`,
                    background: form.repeatFreq === f.id ? colors.MAGENTA_LIGHT : "transparent",
                    color: form.repeatFreq === f.id ? colors.MAGENTA : "#1A1A1A",
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.12s",
                  }}>
                  {f.label}
                </button>
              ))}
            </div>

            {/* Ends */}
            <div>
              <div style={{ ...LABEL, marginBottom: 6 }}>Ends</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {END_OPTIONS.map((opt) => (
                  <div key={opt} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button
                      onClick={() => form.setRepeatEnds(opt)}
                      title={`Ends ${opt}`}
                      style={{
                        width: 16,
                        height: 16,
                        padding: 0,
                        borderRadius: "50%",
                        border: `2px solid ${form.repeatEnds === opt ? colors.MAGENTA : "#C0B0C0"}`,
                        background: form.repeatEnds === opt ? colors.MAGENTA : "transparent",
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}>
                      {form.repeatEnds === opt && (
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />
                      )}
                    </button>

                    {opt === "never" && <span style={TEXT}>Never</span>}

                    {opt === "on" && (
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }}>
                        <span style={TEXT}>On</span>
                        <div style={{ flex: 1 }}>
                          <DateDropdown
                            month={form.repeatEndMonth}
                            day={form.repeatEndDay}
                            year={form.repeatEndYear}
                            onChange={(m, d, y) => {
                              form.setRepeatEndMonth(m);
                              form.setRepeatEndDay(d);
                              form.setRepeatEndYear(y);
                              form.setRepeatEnds("on");
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {opt === "after" && (
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={TEXT}>After</span>
                        <input
                          type="number"
                          min={1}
                          max={99}
                          value={form.repeatCount}
                          onChange={(e) => {
                            form.setRepeatCount(Math.max(1, +e.target.value));
                            form.setRepeatEnds("after");
                          }}
                          style={{
                            width: 48,
                            padding: "4px 6px",
                            borderRadius: 6,
                            border: "1px solid #C8DCF0",
                            fontFamily: "Helvetica, Arial, sans-serif",
                            fontSize: 13,
                            outline: "none",
                            textAlign: "center",
                          }}
                        />
                        <span style={TEXT}>occurrences</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Colour */}
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <span style={{ ...LABEL, marginBottom: 0, marginRight: 2 }}>Color</span>
        {EVENT_COLORS.map((c) => (
          <button
            key={c}
            onClick={() => form.setColor(c)}
            title={`Use ${c}`}
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: c,
              border: `2.5px solid ${form.color === c ? "#1A1A1A" : "transparent"}`,
              cursor: "pointer",
              flexShrink: 0,
              transition: "border 0.1s",
            }}
          />
        ))}
      </div>

      {/* Share */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={LABEL}>Also add to teammate's calendar</div>
        <select value={form.shareWith} onChange={(e) => form.setShareWith(e.target.value)} style={SELECT}>
          <option value="">— None —</option>
          {TEAM_MEMBERS.filter((m) => m !== authUser).map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        {form.shareWith && (
          <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: 12, color: colors.MAGENTA }}>
            Event will be shared with {form.shareWith}
          </div>
        )}
      </div>

      <button
        onClick={post}
        style={{
          padding: "8px 0",
          borderRadius: 8,
          border: "none",
          background: colors.MAGENTA,
          color: "#fff",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          width: "100%",
        }}>
        Save event
      </button>
    </div>
  );
}
