import * as React from 'react'
import { useStore } from '../models/index'
import TodoItem from './TodoItem'

const TodoList = () => {
  const [state] = useStore('Todo', [
    'add',
    'allDone',
    'allUndo',
    'clearCompleted',
    'setFilter',
    // 'destroy',
    'done',
    'undo'
  ])
  return (
    <ul className="todo-list">
      {Object.keys(state.todos)
        .filter(
          key =>
            state.filter === 'All' ||
            (state.filter === 'Active' && !state.todos[+key].completed) ||
            (state.filter === 'Completed' && state.todos[+key].completed)
        )
        .map(key => (
          <TodoItem
            key={key}
            id={key}
            completed={state.todos[+key].completed}
          />
        ))}
    </ul>
  )
}

export default TodoList
