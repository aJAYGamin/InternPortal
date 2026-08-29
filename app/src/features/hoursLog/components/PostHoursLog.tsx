import colors from "@styles/colors";
import { usePostHoursLog } from "../hooks";
import { PROJECTS } from "../mockData";

interface PostHoursLogProps {
  logHours: (description: string, hours: string, project: string) => boolean;
}

/**
 * Renders a form for new log, include
 * - A text area description
 * - A number hour input
 * - A projects' selection
 */
export default function PostHoursLog({ logHours }: PostHoursLogProps) {
  const { description, setDescription, hours, setHours, project, setProject, reset } = usePostHoursLog();

  /** Creates new log, if success, then reset the input */
  const post = () => {
    const success = logHours(description, hours, project);

    if (success) reset();
  };

  return (
    <div
      style={{
        padding: "12px 20px 18px",
        borderTop: "1px solid #D4E6F5",
        background: "#F9F9F9",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && post()}
          placeholder="What did you work on?"
          style={{
            flex: 1,
            padding: "8px 12px",
            borderRadius: 8,
            border: "1.5px solid #C8DCF0",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 14,
            color: "#1A1A1A",
            outline: "none",
            background: "#fff",
          }}
        />
        <input
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && post()}
          placeholder="hrs"
          type="number"
          min="0.25"
          max="12"
          step="0.25"
          style={{
            width: 60,
            padding: "8px 10px",
            borderRadius: 8,
            border: "1.5px solid #C8DCF0",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 14,
            color: "#1A1A1A",
            outline: "none",
            background: "#fff",
            textAlign: "center",
          }}
        />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <select
          value={project}
          onChange={(e) => setProject(e.target.value)}
          style={{
            flex: 1,
            padding: "7px 10px",
            borderRadius: 8,
            border: "1.5px solid #C8DCF0",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 14,
            color: "#1A1A1A",
            outline: "none",
            background: "#fff",
            cursor: "pointer",
          }}>
          {PROJECTS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        <button
          onClick={post}
          style={{
            padding: "7px 18px",
            borderRadius: 8,
            border: "none",
            background: colors.MAGENTA,
            color: "#fff",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            transition: "background 0.15s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = colors.MAGENTA_DARK)}
          onMouseLeave={(e) => (e.currentTarget.style.background = colors.MAGENTA)}>
          Log
        </button>
      </div>
    </div>
  );
}
