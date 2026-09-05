import CheckIcon from "@icons/CheckIcon";
import PriorityDot from "@icons/PriorityDot";
import Avatar from "@icons/Avatar";
import ArrowIcon from "@icons/ArrowIcon";

import type { Todo } from "../types";

import colors from "@styles/colors";

interface TodoViewProps {
  todo: Todo;
  toggleComplete: (id: number) => void;
  authUser: string;
}

/**
 * Renders information for one to-do task:
 * - Checkbox (toggle incomplete/complete)
 * - Task's description
 * - Author and assignee information
 */
export default function TodoView({ todo, toggleComplete, authUser }: TodoViewProps) {
  return (
    <div
      key={todo.id}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        padding: "10px 0",
        borderBottom: "1px solid #D4E6F5",
        opacity: todo.done ? 0.5 : 1,
        transition: "opacity 0.2s",
      }}>
      {/* Checkbox */}
      <button
        onClick={() => toggleComplete(todo.id)}
        style={{
          width: 18,
          height: 18,
          borderRadius: 5,
          flexShrink: 0,
          marginTop: 1,
          border: `2px solid ${todo.done ? colors.MAGENTA : "#D4B8C8"}`,
          background: todo.done ? colors.MAGENTA : "transparent",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.15s",
        }}>
        {todo.done && <CheckIcon size={10} />}
      </button>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 16,
            color: "#1A1A1A",
            textDecoration: todo.done ? "line-through" : "none",
            lineHeight: 1.4,
          }}>
          {todo.text}
        </div>

        {/* Assignee / author row */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 5, flexWrap: "wrap" }}>
          <PriorityDot priority={todo.priority} />
          {todo.delegated ? (
            <>
              <Avatar name={todo.author} size={16} />
              <span style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: 12, color: "#1A1A1A" }}>
                {todo.author === authUser ? "You" : todo.author}
              </span>
              <span style={{ color: colors.MAGENTA, display: "flex", alignItems: "center" }}>
                <ArrowIcon size={10} />
              </span>
              <Avatar name={todo.assignee} size={16} />
              <span
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontSize: 12,
                  color: colors.MAGENTA,
                  fontWeight: 600,
                }}>
                {todo.assignee === authUser ? "You" : todo.assignee}
              </span>
              {todo.assignee !== authUser && (
                <span
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontSize: 12,
                    background: colors.MAGENTA_LIGHT,
                    color: colors.MAGENTA,
                    padding: "1px 5px",
                    borderRadius: 3,
                  }}>
                  DELEGATED
                </span>
              )}
              {todo.assignee === authUser && todo.author !== authUser && (
                <span
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontSize: 12,
                    background: `${colors.TERTIARY}22`,
                    color: colors.TERTIARY,
                    padding: "1px 5px",
                    borderRadius: 3,
                  }}>
                  ASSIGNED TO YOU
                </span>
              )}
            </>
          ) : (
            <>
              <Avatar name={authUser} size={16} />
              <span style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: 12, color: "#1A1A1A" }}>
                Personal
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
