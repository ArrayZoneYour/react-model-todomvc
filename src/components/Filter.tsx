import * as React from "react";
import { useState } from "react";
import { useStore } from "../models/index";

const Filter = () => {
  const [state, actions] = useStore("Todo");
  return (
    <ul className="filters">
      {["All", "Active", "Completed"].map(filter => (
        <li key={filter}>
          <a
            className={filter === state.filter ? "selected" : ""}
            style={{ cursor: "pointer" }}
            onClick={() => {
              actions.setFilter(filter);
            }}
          >
            {filter}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Filter;
