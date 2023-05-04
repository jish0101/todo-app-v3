import React from "react";
import tick from "../../images/icon-check.svg";
import cross from "../../images/icon-cross.svg";

export default function Todo({ todo, toggleTodo, deleteTodo }) {
  function handleChange() {
    toggleTodo(todo.id);
  }
  return (
    <div className="todo__list">
      <label
        htmlFor={todo.id}
        className={`${todo.complete ? "task-completed" : null}`}
      >
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={handleChange}
          className="check-box"
          id={todo.id}
        />
        <span className={`checkbox-pseudo ${todo.complete ? "check-bg" : ""}`}>
          {todo.complete ? <img src={tick} /> : null}
        </span>
        {todo.todoText}
        <button className="cross-btn" onClick={() => deleteTodo(todo.id)}>
          <img src={cross} />
        </button>
      </label>
    </div>
  );
}
