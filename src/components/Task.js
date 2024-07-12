import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleTodo, editTodo } from "../redux/actions";
import "../App.css";

const Task = ({ task }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTodo(task.id));
  };

  const handleEdit = () => {
    if (editedDescription.trim() !== "") {
      dispatch(editTodo(task.id, editedDescription));
      setEditMode(false);
    }
  };

  return (
    <li className="task">
      <div className="task-header">
        <input 
          type="checkbox" 
          checked={task.isDone} 
          onChange={handleToggle} 
        />
        {editMode ? (
          <input
            type="text"
            className="task-edit-input"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
        ) : (
          <span className={`task-description ${task.isDone ? "task-done" : ""}`}>
            {task.description}
          </span>
        )}
      </div>
      <div className="task-actions">
        {editMode ? (
          <button className="task-save-button" onClick={handleEdit}>
            Save
          </button>
        ) : (
          <button className="task-edit-button" onClick={() => setEditMode(true)}>
            Edit
          </button>
        )}
      </div>
    </li>
  );
};

export default Task;
