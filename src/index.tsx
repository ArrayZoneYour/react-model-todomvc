import * as React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import 'todomvc-app-css/index.css'

var { registerObserver } = require('react-perf-devtool')

// Simple, no?
registerObserver()

const rootElement = document.getElementById('root')
render(<App />, rootElement)
