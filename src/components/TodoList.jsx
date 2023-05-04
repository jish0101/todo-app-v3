import React from "react";
import Todo from "./Todo";
import { Reorder } from "framer-motion";

export default function TodoList({ todos, toggleTodo, deleteTodo, setTodos }) {
  return (
    <Reorder.Group
      axis="y"
      values={todos}
      onReorder={setTodos}
      orderConstraints={{ top: 0, bottom: 0 }}
    >
      {todos.map((todo) => (
        <Reorder.Item key={todo.id} value={todo}>
          <Todo
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
