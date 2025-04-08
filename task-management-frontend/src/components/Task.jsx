import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const Task = () => {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks();
  }, [])

  async function getTasks() {
    try {
      const response = await axios.get("http://localhost:8080/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  async function deleteTask(id) {
    if (window.confirm(`Are you sure you want to delete ${tasks.find(task => task.id === id).name}?`)) {
      try {
        await axios.delete(`http://localhost:8080/tasks/${id}`);
        getTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  }

  return (
    <div className="container mt-3">
      <table className="table caption-top table-success table-bordered table-hover">
        <caption className="text-center">Add a Task in Category</caption>
        <thead>
          <tr>
            <th>Task Id</th>
            <th>Task</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            tasks.map(task =>
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.dueDate}</td>
                <td>{task.category.name}</td>
                <td>
                  <Link className="btn btn-outline-primary mx-2" to={`/edit-task/${task.id}`}>Edit</Link>
                  <button className="btn btn-outline-danger mx-2" onClick={() => deleteTask(task.id)}>Delete</button>
                </td>
              </tr>)
          }
        </tbody>
      </table>
    </div>
  )
}

export default Task