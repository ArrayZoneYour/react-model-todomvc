import * as React from "react";
import { useStore } from "../models/index";

import Header from "./Header.tsx";
import TodoMaker from "./TodoMaker.tsx";
import TodoItem from "./TodoItem.tsx";
import TodoList from "./TodoList.tsx";
import Filter from "./Filter.tsx";

const App = () => {
  const [state, actions] = useStore("Todo");
  const incompletedCount = state.todos.reduce(
    (count, todo) => count + !todo.completed,
    0
  );
  return (
    <div>
      <div className="header">
        <h1>todos</h1>
        <TodoMaker />
      </div>
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={incompletedCount === 0 && state.todos.length > 0}
          onChange={incompletedCount === 0 ? actions.allUndo : actions.allDone}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodoList />
      </section>
      <footer className="footer">
        <span className="todo-count">
          <strong>{incompletedCount}</strong> item left
        </span>
        <Filter />
        <button className="clear-completed" onClick={actions.clearCompleted}>
          Clear completed
        </button>
      </footer>
    </div>
  );
};

export default App;
