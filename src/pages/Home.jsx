import { useEffect, useReducer, useRef, useState } from "react";
import TodoList from "../components/TodoList";
import useLocalStorage from "../hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid";
import sunIcon from "../../images/icon-sun.svg";
import moonIcon from "../../images/icon-moon.svg";
import Navbar from "../components/navbar/Navbar";
import Modal from "../components/modal/Modal";

const tips = [
  { id: 0, todoText: "Tap to check/uncheck todo 😊", complete: false },
  {
    id: 1,
    todoText: "Your todos are saved in browser's storage 🚀",
    complete: false,
  },
];

function Home() {
  const [todos, setTodos] = useLocalStorage("todos-V2", tips);
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useReducer(reducer, {
    all: true,
    left: false,
    complete: false,
  });
  const todoRef = useRef();
  let todosLeft = todos.filter((todo) => !todo.complete);
  let todosComplete = todos.filter((todo) => {
    if (todo.complete) {
      return todo;
    }
  });

  const [darkTheme, setDarkTheme] = useLocalStorage("theme-V2", false);

  function addTodo(e) {
    e.preventDefault();
    const todoText = todoRef.current.value;
    if (!todoText) return;
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        { id: uuidv4(), todoText: todoText, complete: false },
      ];
    });
    todoRef.current.value = "";
  }

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = todos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function deleteTodo(id) {
    if (id) {
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
    } else {
      setTodos(todosLeft);
    }
  }

  function reducer(state, action) {
    switch (action.type) {
      case "all":
        return {
          all: true,
          left: false,
          complete: false,
        };
      case "left":
        return {
          all: false,
          left: true,
          complete: false,
        };
      case "complete":
        return {
          all: false,
          left: false,
          complete: true,
        };
      default:
        return state;
    }
  }

  useEffect(() => {
    todoRef.current.focus();
  }, []);

  return (
    <div className="App" data-theme={`${darkTheme ? "dark" : "light"}`}>
      <div className="todo__container">
        <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} setIsOpen={setIsOpen} />
        <div className="todo__header">
          {isOpen && <Modal setIsOpen={setIsOpen} />}
          <div className="todo__header_input-container">
            <form onSubmit={(e) => addTodo(e)}>
              <button className="todo__header_input-btn">&#43;</button>
              <input
                type="text"
                placeholder="Create a new todo..."
                ref={todoRef}
              />
            </form>
          </div>
        </div>
        <div className="todo__todo-list_container">
          {active.all && (
            <TodoList
              todos={todos}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              setTodos={setTodos}
            />
          )}
          {active.left && (
            <TodoList
              todos={todosLeft}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              setTodos={setTodos}
            />
          )}
          {active.complete && (
            <TodoList
              todos={todosComplete}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              setTodos={setTodos}
            />
          )}
          <div className="todo__footer">
            <div className="todo__footer_todos-left">
              <span>
                {todosLeft.length +
                  `${todosLeft.length > 1 ? " items " : " item "} left`}
              </span>
            </div>
            <div className="todo__footer_filters">
              <button
                onClick={() => setActive({ type: "all" })}
                className={`todo__filter-btn ${
                  active.all ? "task-filter-active" : null
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActive({ type: "left" })}
                className={`todo__filter-btn ${
                  active.left ? "task-filter-active" : null
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setActive({ type: "complete" })}
                className={`todo__filter-btn ${
                  active.complete ? "task-filter-active" : null
                }`}
              >
                Completed
              </button>
            </div>
            <div className="todo__footer-clear">
              <button
                className="todo__footer-clear-btn todo__filter-btn"
                onClick={() => deleteTodo()}
              >
                Clear Completed
              </button>
            </div>
          </div>
        </div>
        <div className="todo__footer_filters-sm-only">
          <button
            onClick={() => setActive({ type: "all" })}
            className={`todo__filter-btn ${
              active.all ? "task-filter-active" : null
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActive({ type: "left" })}
            className={`todo__filter-btn ${
              active.left ? "task-filter-active" : null
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setActive({ type: "complete" })}
            className={`todo__filter-btn ${
              active.complete ? "task-filter-active" : null
            }`}
          >
            Completed
          </button>
        </div>
        <p id="drag-n-drop">Drag and drop to reorder list</p>
      </div>
    </div>
  );
}

export default Home;  