import * as React from 'react'
import { useStore } from '../models/index'

const Toggle = () => {
  const [state, actions] = useStore('Todo')
  const incompletedCount = Object.keys(state.todos).reduce(
    (count, key) => count + +!state.todos[+key].completed,
    0
  )
  return (
    <input
      id="toggle-all"
      className="toggle-all"
      type="checkbox"
      checked={incompletedCount === 0 && Object.keys(state.todos).length > 0}
      onChange={() =>
        incompletedCount === 0 ? actions.allUndo() : actions.allDone()
      }
    />
  )
}

export default Toggle
