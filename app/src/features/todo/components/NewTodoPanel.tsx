import { useNewTodoForm } from "../hooks";

import Avatar from "@icons/Avatar";

import { authUser, TEAM_MEMBERS } from "../mockData";
import type { AssignMode, Todo } from "../types";
import colors from "@styles/colors";

interface NewTaskPanelProps {
  addTodo: (todo: Omit<Todo, "id">) => void;
}

/**
 * Renders the input form for new to-do task, includes
 * - mode toggle (self vs. delegate)
 * - text input (task's description)
 * - priority button
 * - team member's dropdown selection (when delegate task to someone else)
 * - assignee input (custom assignee)
 */
export default function NewTodoPanel({ addTodo }: NewTaskPanelProps) {
  // prettier-ignore
  const { 
    text, setText,
    priority, setPriority,
    assignMode, setAssignMode,
    delegateTo, setDelegateTo, 
    customDelegate, setCustomDelegate ,
    buildTodo, reset
  } = useNewTodoForm(authUser);

  function post() {
    const newTodo = buildTodo();

    if (newTodo) {
      addTodo(newTodo);
      reset();
    }
  }

  return (
    <div style={{ padding: "14px 20px 18px", borderTop: "1px solid #D4E6F5", background: "#FFFFFF" }}>
      {/* Mode toggle */}
      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
        {(["self", "delegate"] as AssignMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => setAssignMode(mode)}
            style={{
              padding: "5px 14px",
              borderRadius: 7,
              border: `1.5px solid ${assignMode === mode ? colors.MAGENTA : "#C8DCF0"}`,
              background: assignMode === mode ? colors.MAGENTA : "#fff",
              color: assignMode === mode ? "#fff" : "#1A1A1A",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.15s",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}>
            {mode === "self" ? (
              <>
                <Avatar name={authUser} size={14} />
                For myself
              </>
            ) : (
              <>
                <span style={{ fontSize: 16 }}>→</span>
                Delegate to someone
              </>
            )}
          </button>
        ))}
      </div>

      {/* Delegate target picker */}
      {assignMode === "delegate" && (
        <div style={{ marginBottom: 8 }}>
          <select
            value={delegateTo}
            onChange={(e) => setDelegateTo(e.target.value)}
            style={{
              width: "100%",
              padding: "7px 10px",
              borderRadius: 8,
              border: "1.5px solid #C8DCF0",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 14,
              color: "#1A1A1A",
              background: "#fff",
              outline: "none",
              cursor: "pointer",
              appearance: "none",
            }}>
            <option value="">Select a team member…</option>
            {TEAM_MEMBERS.filter((m) => m !== authUser).map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
            <option value="__custom__">+ Enter a name…</option>
          </select>
          {delegateTo === "__custom__" && (
            <input
              value={customDelegate}
              onChange={(e) => setCustomDelegate(e.target.value)}
              placeholder="Enter their name"
              style={{
                width: "100%",
                padding: "7px 10px",
                borderRadius: 8,
                border: "1.5px solid #C8DCF0",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: 14,
                color: "#1A1A1A",
                background: "#fff",
                outline: "none",
                marginTop: 6,
              }}
            />
          )}
        </div>
      )}

      {/* Task input row */}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && post()}
          placeholder={assignMode === "self" ? "Add a task for yourself…" : "Describe the task to delegate…"}
          style={{
            flex: 1,
            padding: "8px 12px",
            borderRadius: 8,
            border: "1.5px solid #C8DCF0",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 14,
            color: "#1A1A1A",
            background: "#fff",
            outline: "none",
          }}
        />

        {/* Priority dots */}
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          {(["low", "medium", "high"] as const).map((p) => {
            const colors = { low: "#10B981", medium: "#F59E0B", high: "#EF4444" };
            return (
              <button
                key={p}
                onClick={() => setPriority(p)}
                title={`${p} priority`}
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  border: `2px solid ${colors[p]}`,
                  background: priority === p ? colors[p] : "transparent",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              />
            );
          })}
        </div>

        {/** Post button */}
        <button
          onClick={post}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            border: "none",
            background: colors.MAGENTA,
            color: "#fff",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            flexShrink: 0,
            transition: "opacity 0.15s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = colors.MAGENTA_DARK)}
          onMouseLeave={(e) => (e.currentTarget.style.background = colors.MAGENTA)}>
          {assignMode === "self" ? "Add Task" : "Delegate"}
        </button>
      </div>
    </div>
  );
}
