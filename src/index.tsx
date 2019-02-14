import * as React from "react";
import { render } from "react-dom";
import App from "./components/App.tsx";
import "todomvc-app-css/index.css";

const rootElement = document.getElementById("root");
render(<App />, rootElement);
