import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import { updateTask, getTaskById} from '../services/TaskService.js';


const EditTask = () => {

    const { state } = useLocation();
    const categoryName = state?.categoryName || ""; // Extract category name from state if available

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    const task = { name, description, dueDate };

    // This hook is to extract URL parameters from a router
    const { id } = useParams();

    // Populate the form with existing data if id is present
    useEffect(() => {
        if (id) {
            fetchTaskById(id);
        }
    }, [id])

    // Fecth the task data from the server by id
    async function fetchTaskById(id) {
        try {
            const response = await getTaskById(id);
            setName(response.data.name);
            setDescription(response.data.description);
            setDueDate(response.data.dueDate);
        } catch (error) {
            console.error("Error fetching task:", error);
        }
    }

    async function editTask(e) {
            e.preventDefault();
    
            try {
                await updateTask(id, task);
                navigate("/tasks");
            } catch (error) {
                console.error("Error updating task:", error);
            }
        }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="card col-md-6 offset-md-3">
                    <h2 className="text-center mt-3">Add Task</h2>
                    <div className="card-body">
                        <form onSubmit={editTask}>
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
                            <div className="d-flex align-items-center mb-4">
                                <label htmlFor="Category" className="form-label me-3 mb-0">
                                    Category:
                                </label>
                                <input
                                    readOnly
                                    className="form-control bg-light text-muted"
                                    value={categoryName} // Display the category name for read-only
                                />
                            </div>
                            <div className="d-flex justify-content-center gap-3">
                                <button type="submit" className="btn btn-outline-primary">Submit</button>
                                <Link className="btn btn-outline-danger" to="/tasks">Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditTask