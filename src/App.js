import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddTask from "./components/AddTask";
import ListTask from "./components/ListTask";
import { setFilter } from "./redux/actions";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  
  // Selecting state from the store
  const filter = useSelector((state) => state.filter);
  const tasks = useSelector((state) => state.tasks);

  // Handling filter change
  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  // Memoizing filtered tasks for performance optimization
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "done":
        return tasks.filter((task) => task.isDone);
      case "not-done":
        return tasks.filter((task) => !task.isDone);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  return (
    <div className="container">
      <h1>ToDo App</h1>
      <AddTask />
      <div className="filter-container">
        <label className="filter">
          Filter:
          <select value={filter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="done">Done</option>
            <option value="not-done">Not Done</option>
          </select>
        </label>
      </div>
      <ListTask tasks={filteredTasks} />
    </div>
  );
};

export default App;
