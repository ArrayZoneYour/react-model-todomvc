import * as React from 'react'
import { useStore } from '../models/index'

type Filter = 'All' | 'Active' | 'Completed'

const Filter = () => {
  const [state, actions] = useStore('Todo', ['setFilter'])
  return (
    <ul className="filters">
      {(['All', 'Active', 'Completed'] as Filter[]).map(filter => (
        <li key={filter}>
          <a
            className={filter === state.filter ? 'selected' : ''}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              actions.setFilter(filter)
            }}
          >
            {filter}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default Filter
