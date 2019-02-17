import * as React from 'react'
import { useState, useMemo } from 'react'
import { useStore } from '../models/index'

interface Todo {
  id: number
}

const TodoItem = (props: Todo & any) => {
  const [state, actions] = useStore('Todo', [
    // The actions will always invoke the component which contain it.
    // So, depActions only prevent the update from other parallel components' actions
    // The empty array here means all actions(clearCompleted, allDone, allUndo, done, undo, setFilter, destroy ...) from Other components' function won't invoke this TodoItem's setState.
    // 'clearCompleted',
    // 'allDone',
    // 'allUndo'
    // 'done',
    // 'undo',
    // 'setFilter'
    // 'destroy'
  ])
  const [editing, setEditing] = useState(false)
  const status = editing
    ? 'editing'
    : (state.todos[props.id] || {}).completed
    ? 'completed'
    : ''
  const [title, setTitle] = useState((state.todos[props.id] || {}).title)
  if (
    state.todos[props.id].deleted ||
    !(
      state.filter === 'All' ||
      (state.filter === 'Active' && !state.todos[props.id].completed) ||
      (state.filter === 'Completed' && state.todos[props.id].completed)
    )
  ) {
    return null
  }

  const doubleClickHandler = () => {
    setEditing(true)
  }
  const inputHandler = (e: any) => {
    setTitle(e.target.value)
  }
  const submit = (e: any) => {
    if (e.which === 13) {
      setEditing(false)
      actions.edit({ id: props.id, title: e.target.value })
    }
  }
  const done = () => {
    actions.done(props.id)
  }
  const undo = () => {
    actions.undo(props.id)
  }
  const destroy = () => {
    actions.destroy(props.id)
  }

  return state.todos[props.id] ? (
    <li className={status}>
      <div className="view">
        <input
          onClick={state.todos[props.id].completed ? undo : done}
          className="toggle"
          readOnly
          type="checkbox"
          checked={state.todos[props.id].completed}
        />
        <label onDoubleClick={doubleClickHandler}>
          {state.todos[props.id].title}
        </label>
        <button className="destroy" onClick={destroy} />
      </div>
      <input
        className="edit"
        value={title}
        onChange={inputHandler}
        onKeyDown={submit}
      />
    </li>
  ) : null
}

export default React.memo(TodoItem)
