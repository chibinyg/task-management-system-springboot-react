import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const AddTask = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    const task = { name, description, dueDate };

    // This hook is to extract URL parameters from a router
    const { categoryId } = useParams();

    async function createTask(e) {
        e.preventDefault();

        try {
            await axios.post(`http://localhost:8080/categories/${categoryId}/tasks`, task);
            navigate("/tasks");
        } catch (error) {
            console.error("Error saving task:", error);
        }
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="card col-md-6 offset-md-3">
                    <h2 className="text-center mt-3">Add Task</h2>
                    <div className="card-body">
                        <form onSubmit={createTask}>
                            <div className="d-flex align-items-center mb-4">
                                <label htmlFor="task" className="form-label me-3 mb-0">
                                    Task:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="task"
                                    placeholder="Enter task name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="d-flex align-items-center mb-4">
                                <label htmlFor="description" className="form-label me-3 mb-0">
                                    Description:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    placeholder="Enter task description"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="d-flex align-items-center mb-4">
                                <label htmlFor="dueDate" className="form-label me-3 mb-0">
                                    Due:
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="dueDate"
                                    value={dueDate}
                                    onChange={e => setDueDate(e.target.value)}
                                    required
                                    min={new Date().toISOString().split("T")[0]} // Set minimum date to today
                                />
                            </div>
                            <div className="d-flex justify-content-center gap-3">
                                <button type="submit" className="btn btn-outline-primary">Submit</button>
                                <Link className="btn btn-outline-danger" to="/categories">Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTask