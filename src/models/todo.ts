interface Todo {
  title: string;
  completed: boolean;
  id: number;
}

type Filter = "All" | "Active" | "Completed";

type State = {
  todos: Todo[];
  filter: Filter;
  id: number;
};

type ActionParams = {
  add: string;
  edit: { id: number; title: string };
  done: number;
  allDone: undefined;
  undo: number;
  allUndo: undefined;
  setFilter: Filter;
  clearCompleted: undefined;
};

const defaultTodos = [
  { title: "Taste React Hooks", completed: true, id: 0 },
  { title: "Make a issue", completed: false, id: 1 },
  { title: "Make a PR", completed: false, id: 2 },
  { title: "Give a star", completed: false, id: 3 }
];

const model: ModelType<State, ActionParams> = {
  state: {
    todos: defaultTodos,
    filter: "All",
    id: 4
  },
  actions: {
    add: (_, __, title) => {
      return state => {
        state.todos.push({ title, completed: false, id: state.id });
        state.id += 1;
      };
    },
    edit: (_, __, info) => {
      return state => {
        state.todos.map(todo => {
          if (todo.id === info.id) {
            todo.title = info.title;
          }
        });
      };
    },
    done: (_, __, id) => {
      return state => {
        state.todos.map(todo => {
          if (todo.id === id) {
            todo.completed = true;
          }
        });
      };
    },
    allDone: () => {
      return state => {
        state.todos.map(todo => (todo.completed = true));
      };
    },
    undo: (_, __, id) => {
      return state => {
        state.todos.map(todo => {
          if (todo.id === id) {
            todo.completed = false;
          }
        });
      };
    },
    allUndo: () => {
      return state => {
        state.todos.map(todo => (todo.completed = false));
      };
    },
    setFilter: (_, __, filter) => {
      return { filter };
    },
    clearCompleted: state => {
      return { todos: state.todos.filter(todo => !todo.completed) };
    }
  }
};

export default model;
