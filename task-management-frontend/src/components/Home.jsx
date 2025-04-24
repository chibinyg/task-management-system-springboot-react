import React, { useState, useEffect } from 'react'
import { getTasks } from '../services/TaskService.js';

const Task = () => {

  const [tasks, setTasks] = useState([]);
  const [searchCategory, setSearchCategory] = useState('');
  const [searchDueDate, setSearchDueDate] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [])

  async function fetchTasks() {
    try {
      const response = await getTasks();
      // Sort by dueDate ascending
      const sortedTasks = response.data.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      setTasks(sortedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  const filteredTasks = tasks.filter(task => {
    // Filter by category and due date
    // Convert both to lowercase for case-insensitive comparison
    // Check if the task's category name includes the search term
    // Check if the task's due date is less than or equal to the search due date
    // If no search due date is provided, include all tasks
    // If no search category is provided, include all tasks
    const matchesCategory = task.category.name.toLowerCase().includes(searchCategory.toLowerCase());
    const matchesDueDate = searchDueDate ? new Date(task.dueDate) <= new Date(searchDueDate) : true;
    return matchesCategory && matchesDueDate;
  });

  return (
    <div className="container mt-3">
      <h3 className="text-center mb-4">Upcoming Tasks</h3>

      {/* Search Filters */}
      <div className="row mb-3">
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search by category"
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
          />
        </div>
        <div className="col-md-5">
          <input
            type="date"
            className="form-control"
            value={searchDueDate}
            onChange={(e) => setSearchDueDate(e.target.value)}
          />
        </div>
        {/* // Add a button to clear filters */}
        <div className="col-md-2">
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              setSearchCategory('');
              setSearchDueDate('');
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Task Table */}
      <table className="table caption-top table-success table-bordered table-striped">
        <caption className="text-center">Filtered by Category & Due Date</caption>
        <thead>
          <tr>
            <th>Task</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredTasks.length > 0 ? (
              filteredTasks.map(task =>
                <tr key={task.id}>
                  <td>{task.name}</td>
                  <td>{task.description}</td>
                  <td>{task.dueDate}</td>
                  <td>{task.category.name}</td>
                </tr>
              )
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No tasks found</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Task