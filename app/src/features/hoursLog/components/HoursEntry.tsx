import type { HourEntry } from "../types";
import colors from "@styles/colors";

/**
 * Renders information for each log, include
 * - Number of hours
 * - Log description
 * - Log project
 */
export default function HoursEntry({ entry }: { entry: HourEntry }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "7px 10px",
        borderRadius: 8,
        background: "#F9F9F9",
      }}>
      {/** Log hours */}
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 7,
          background: colors.MAGENTA_LIGHT,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}>
        <span
          style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 12,
            color: colors.MAGENTA,
            fontWeight: 700,
          }}>
          {entry.hours}h
        </span>
      </div>

      {/** Log description + project */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 14,
            fontWeight: 500,
            color: "#1A1A1A",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}>
          {entry.description}
        </div>
        <div
          style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 12,
            color: "#1A1A1A",
            marginTop: 1,
          }}>
          {entry.project}
        </div>
      </div>
    </div>
  );
}
