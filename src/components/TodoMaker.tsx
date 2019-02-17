import * as React from 'react'
import { useStore } from '../models/index'

const TodoMaker = () => {
  const [, actions] = useStore('Todo', [])
  const submit = (e: any) => {
    if (e.which === 13) {
      actions.add(e.target.value)
      e.target.value = ''
    }
  }
  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      onKeyDown={submit}
      autoFocus
    />
  )
}

export default TodoMaker
