import { useTodoFilter } from "../hooks";

import NewTodoPanel from "./NewTodoPanel";
import TodoView from "./TodoView";
import Card from "@components/Card";
import CardHeader from "@components/CardHeader";
import { DismissCompleteButton, FilterButton } from "./TodoButtons";

import { authUser } from "../mockData";
import type { TodoStore } from "../types";

interface TodoWidgetProps {
  onExpand?: () => void;
  onClose?: () => void;
  todoStore: TodoStore;
}

/**
 * Renders to-do widget, includes:
 * - To-do list
 * - Filter system
 * - Remove completed to-do task
 * - Add new to-do task
 */
export default function TodoWidget({ onExpand, onClose, todoStore }: TodoWidgetProps) {
  const { todos, toggle, addTodo, removeCompletedTodos } = todoStore;
  const { filter, setFilter, filteredTodos, filterConfigs } = useTodoFilter(todos, authUser);

  return (
    <Card>
      <CardHeader
        title="Team To-Do"
        onExpand={onExpand}
        onClose={onClose}
        action={
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            {filterConfigs.map((f) => (
              <FilterButton key={f.id} filter={filter} setFilter={setFilter} filterConfig={f} />
            ))}
          </div>
        }
      />

      {filteredTodos.some((t) => t.done) && <DismissCompleteButton dismiss={removeCompletedTodos} />}

      <div style={{ maxHeight: 300, overflowY: "auto", padding: "0 20px" }}>
        {filteredTodos.length === 0 ? (
          <div
            style={{
              padding: "28px 0",
              textAlign: "center",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 16,
              color: "#1A1A1A",
            }}>
            Nothing here — all clear!
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <TodoView key={todo.id} todo={todo} toggleComplete={toggle} authUser={authUser} />
          ))
        )}
      </div>

      <NewTodoPanel addTodo={addTodo} />
    </Card>
  );
}
