import React, { useState } from "react";
import "./App.css";

function App() {
  const [addLists, setAddLists] = useState([]);
  const [addTodos, setAddTodos] = useState("");
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [error, setError] = useState("");

  const showMessage = (msg) => {
    setError(msg);
    setTimeout(() => setError(""), 2000);
  };

  const addTodoList = () => {
    const finalInput = addTodos.trim();
    if (finalInput === "") {
      showMessage("Please enter a task!");
      return;
    }
    if (addLists.some((t) => t.toLowerCase() === finalInput.toLowerCase())) {
      showMessage("That task is already added!");
      return;
    }

    setAddLists((prev) => [...prev, finalInput]);
    setAddTodos("");
    showMessage("Successfully added!");
  };

  const delTodoList = (index) => {
    setAddLists(addLists.filter((_, i) => i !== index));
    setDeleteIndex(null);
    showMessage("Successfully deleted!");
  };

  const moveUp = (index) => {
    if (index > 0) {
      const updated = [...addLists];
      [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
      setAddLists(updated);
    }
  };

  const moveDown = (index) => {
    if (index < addLists.length - 1) {
      const updated = [...addLists];
      [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
      setAddLists(updated);
    }
  };

  const openEdit = (index) => {
    setEditIndex(index);
    setEditValue(addLists[index]);
  };

  const saveEdit = () => {
    const trimmed = editValue.trim();
    if (trimmed === "") {
      showMessage("Please enter a valid task!");
      return;   
    }
    const updated = [...addLists];
    updated[editIndex] = trimmed;
    setAddLists(updated);
    setEditIndex(null);
    showMessage("Task updated!");
  };

  return (
    <>
      <div className="titleContainer">
        <h1>My Todo List</h1>
      </div>

      <div className="AppContainer">
        <div className="TodoAddContainer">
          <input
            value={addTodos}
            onChange={(e) => setAddTodos(e.target.value)}
            type="text"
            placeholder="Enter a task..."
          />
          <button className="addBtn" onClick={addTodoList}>Add</button>
        </div>

        <div className="ulContainer">
          <ul className="listContainer">
            {addLists.map((task, index) => (
              <li className="TaskList" key={index}>
                <p>Task {index + 1}: {task}</p>
                <div className="BtnContainer">
                  <button className="del" onClick={() => setDeleteIndex(index)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <button className="edit" onClick={() => openEdit(index)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button className="up" onClick={() => moveUp(index)}>
                    <i className="fa-solid fa-arrow-up"></i>
                  </button>
                  <button className="down" onClick={() => moveDown(index)}>
                    <i className="fa-solid fa-arrow-down"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Delete Modal */}
      {deleteIndex !== null && (
        <div className="deleteList">
          <div className="deleteContainer">
            <p className="delQuestion">Are you sure you want to delete this task?</p>
            <div className="containerBtn">
              <button onClick={() => setDeleteIndex(null)}>No</button>
              <button onClick={() => delTodoList(deleteIndex)}>Yes</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editIndex !== null && (
        <div className="deleteList">
          <div className="deleteContainer">
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
            <div className="containerBtn">
              <button onClick={() => setEditIndex(null)}>Cancel</button>
              <button onClick={saveEdit}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Error/Success Message */}
      {error && (
        <div className="Error1">
          <div className="Error1Container">
            <p>{error}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
