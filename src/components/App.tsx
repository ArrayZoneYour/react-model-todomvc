import * as React from 'react'

import TodoMaker from './TodoMaker'
import TodoList from './TodoList'
import Footer from './Footer'
import Toggle from './Toggle'

const App = () => {
  return (
    <div>
      <div className="header">
        <h1>todos</h1>
        <TodoMaker />
      </div>
      <section className="main">
        <Toggle />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodoList />
      </section>
      <Footer />
    </div>
  )
}

export default App
