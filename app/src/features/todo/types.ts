export interface Todo {
  id: number
  text: string
  done: boolean
  author: string      // who created / delegated it
  assignee: string    // who should do it
  priority: "low" | "medium" | "high"
  delegated: boolean  // true when author !== assignee
}

export type TodoFilter = "all" | "mine" | "delegated-out" | "done"
export type AssignMode = "self" | "delegate"

export interface FilterConfig {
  id: TodoFilter,
  label: string,
  count?: number
}

export interface TodoStore {
  todos: Todo[],
  toggle: (id: number) => void, // toggle incomplete/complete state
  addTodo: (todo: Omit<Todo, "id">) => void,
  removeCompletedTodos: () => void
}