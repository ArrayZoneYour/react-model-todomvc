import * as React from 'react'
import { useStore } from '../models/index'
import Filter from './Filter'

const Footer = () => {
  const [state, actions] = useStore('Todo')
  const incompletedCount = Object.keys(state.todos).reduce(
    (count, key) => count + +!state.todos[+key].completed,
    0
  )
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{incompletedCount}</strong> item left
      </span>
      <Filter />
      <button
        className="clear-completed"
        onClick={() => actions.clearCompleted()}
      >
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
