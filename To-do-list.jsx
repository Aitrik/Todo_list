import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Css/To_do.css';

export default function To_do() {
  const [todo, setTodo] = useState([]);
  const [newtodo, setNew] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const notify = (message) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const addto = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      let updatedTodo = [...todo];
      updatedTodo[editIndex] = newtodo;
      setTodo(updatedTodo);
      setNew('');
      setEditIndex(null);
      notify('Task updated successfully!');
    } else {
      if (newtodo.trim() !== '') {
        setTodo([...todo, newtodo]);
        setNew('');
        notify('Task added successfully!');
      }
    }
  };

  const deleteto = (index) => {
    let updatedTodo = [...todo];
    updatedTodo.splice(index, 1);
    setTodo(updatedTodo);
    notify('Task deleted successfully!');
  };

  const editTodo = (index) => {
    setNew(todo[index]);
    setEditIndex(index);
  };

  return (
    <div className="todo-container">
      <h1 className="todo-heading">To-do-List</h1>
      <form onSubmit={addto} className="todo-form">
        <div className="input-group">
          <input
            type="text"
            className="form-control todo-input"
            placeholder="Add a new task..."
            value={newtodo}
            onChange={(e) => setNew(e.target.value)}
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-primary todo-button">
              {editIndex !== null ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </div>
      </form>
      <table className="table todo-table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Task</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {todo.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item}</td>
              <td>
                <button
                  onClick={() => editTodo(index)}
                  className="btn btn-warning todo-edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteto(index)}
                  className="btn btn-danger todo-delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}
