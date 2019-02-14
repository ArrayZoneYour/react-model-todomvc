import * as React from "react";
import { useState } from "react";
import { useStore } from "../models/index";

interface Todo {
  completed: boolean;
  title: string;
  id: number;
}

const TodoItem = (props: Todo) => {
  const [, actions] = useStore("Todo");
  const [editing, setEditing] = useState(false);
  const status = editing ? "editing" : props.completed ? "completed" : "";
  const [title, setTitle] = useState(props.title);

  const doubleClickHandler = () => {
    setEditing(true);
  };
  const inputHandler = e => {
    setTitle(e.target.value);
  };
  const submit = e => {
    if (e.which === 13) {
      setEditing(false);
      actions.edit({ id: props.id, title: e.target.value });
    }
  };
  const done = () => {
    actions.done(props.id);
  };
  const undo = () => {
    actions.undo(props.id);
  };

  return (
    <li className={status}>
      <div className="view">
        <input
          onClick={props.completed ? undo : done}
          className="toggle"
          readOnly
          type="checkbox"
          checked={props.completed}
        />
        <label onDoubleClick={doubleClickHandler}>{props.title}</label>
        <button className="destroy" />
      </div>
      <input
        className="edit"
        value={title}
        onChange={inputHandler}
        onKeyDown={submit}
      />
    </li>
  );
};

export default TodoItem;
