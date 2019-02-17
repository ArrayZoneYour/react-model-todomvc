interface Todo {
  title: string
  completed: boolean
  id: number
  deleted: boolean
}

type Filter = 'All' | 'Active' | 'Completed'
type Todos = { [key: number]: Todo }

type State = {
  todos: Todos
  filter: Filter
  id: number
}

type ActionParams = {
  add: string
  edit: { id: number; title: string }
  done: number
  allDone: undefined
  undo: number
  allUndo: undefined
  setFilter: Filter
  clearCompleted: undefined
  destroy: number
}

const defaultTodos: Todos = {}
Array.from(Array(10000).keys()).map(
  index =>
    (defaultTodos[+index] = {
      title: 'Todo #' + index,
      id: index,
      completed: false,
      deleted: false
    })
)
// [
//   { title: 'Taste React Hooks', completed: true, id: 0 },
//   { title: 'Make a issue', completed: false, id: 1 },
//   { title: 'Make a PR', completed: false, id: 2 },
//   { title: 'Give a star', completed: false, id: 3 }
// ]

const model: ModelType<State, ActionParams> = {
  state: {
    todos: defaultTodos,
    filter: 'All',
    id: 10000
  },
  actions: {
    add: (_, __, title) => {
      return state => {
        state.todos[state.id] = {
          title,
          completed: false,
          id: state.id,
          deleted: false
        }
        state.id += 1
      }
    },
    edit: (_, __, info) => {
      return state => {
        state.todos[info.id].title = info.title
      }
    },
    done: (_, __, id) => {
      return state => {
        state.todos[id].completed = true
      }
    },
    allDone: () => {
      return state => {
        Object.keys(state.todos).map(
          key => (state.todos[+key].completed = true)
        )
      }
    },
    undo: (_, __, id) => {
      return state => {
        state.todos[id].completed = false
      }
    },
    allUndo: () => {
      return state => {
        Object.keys(state.todos).map(
          key => (state.todos[+key].completed = false)
        )
      }
    },
    setFilter: (_, __, filter) => {
      return { filter }
    },
    clearCompleted: () => {
      return state => {
        Object.keys(state.todos).map(key => {
          if (state.todos[+key].completed) {
            delete state.todos[+key]
          }
        })
      }
    },
    destroy: (_, __, id) => {
      return state => {
        state.todos[id].deleted = true
      }
    }
  }
}

export default model
