// Add/update/delete reminders
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getTaskById, addReminder, deleteReminder} from '../services/TaskService.js';

const AddReminder = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [reminderInterval, setReminderInterval] = useState("");
    const [reminderDate, setReminderDate] = useState("");
    const [title, setTitle] = useState("");

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchTaskById(id);
        }
    }, [id]);

    async function fetchTaskById(id) {
        try {
            const response = await getTaskById(id);
            setName(response.data.name);
            setDescription(response.data.description);
            setDueDate(response.data.dueDate);
            setReminderInterval(response.data.reminderInterval || "");
            setReminderDate(response.data.reminderDate || "");

            setTitle((response.data.reminderDate || "") === "" ? "Add Reminder" : "Update Reminder");
        } catch (error) {
            console.error("Error fetching task:", error);
            alert("Error fetching task");
        }
    }

    async function removeReminder() {
        try {
            await deleteReminder(id);
            navigate("/tasks");
        } catch (error) {
            console.error("Error deleting reminder:", error);
            alert("Error deleting reminder");
        }
    }
        
    const calculateReminderDate = (interval, dueDate) => {
        if (!dueDate) return "";
        
        const dueDateObj = new Date(dueDate);
        const reminderDateObj = new Date(dueDateObj);
        
        switch(interval) {
            case "1-day":
                reminderDateObj.setDate(dueDateObj.getDate() - 1);
                break;
            case "3-days":
                reminderDateObj.setDate(dueDateObj.getDate() - 3);
                break;
            case "1-week":
                reminderDateObj.setDate(dueDateObj.getDate() - 7);
                break;
            case "2-weeks":
                reminderDateObj.setDate(dueDateObj.getDate() - 14);
                break;
            default:
                return "";
        }
        
        // Format as YYYY-MM-DD (LocalDate format)
        return reminderDateObj.toISOString().split('T')[0];
    };

    const handleIntervalChange = (e) => {
        const interval = e.target.value;
        setReminderInterval(interval);
        
        if (interval && dueDate) {
            const calculatedDate = calculateReminderDate(interval, dueDate);
            setReminderDate(calculatedDate);
        }
    };

    async function createReminder(e) {
        e.preventDefault();
        
        if (!reminderInterval) {
            alert("Please select a reminder interval");
            return;
        }

        const task = { 
            name, 
            description, 
            dueDate, 
            reminderInterval,
            reminderDate
        };

        try {
            await addReminder(id, task);
            navigate("/tasks");
        } catch (error) {
            console.error("Error adding a reminder:", error);
            alert("Error adding a reminder");
        }
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="card col-md-6 offset-md-3">
                    <h2 className="text-center mt-3">{title}</h2>
                    <div className="card-body">
                        <form onSubmit={createReminder}>
                            <div className="d-flex align-items-center mb-4">
                                <label htmlFor="task" className="form-label me-3 mb-0">
                                    Task:
                                </label>
                                <input
                                    type="text"
                                    className="form-control bg-light text-muted" // Gray background + muted text
                                    id="task"
                                    value={name}
                                    readOnly
                                    style={{
                                        cursor: "not-allowed", // Changes cursor on hover
                                        border: "1px solid #dee2e6", // Lighter border
                                        opacity: 0.95 // Slightly transparent
                                    }}
                                />
                            </div>
                            <div className="d-flex align-items-center mb-4">
                                <label htmlFor="description" className="form-label me-3 mb-0">
                                    Description:
                                </label>
                                <input
                                    type="text"
                                    className="form-control bg-light text-muted" // Gray background + muted text
                                    id="description"
                                    value={description}
                                    readOnly
                                    style={{
                                        cursor: "not-allowed", // Changes cursor on hover
                                        border: "1px solid #dee2e6", // Lighter border
                                        opacity: 0.95 // Slightly transparent
                                    }}
                                />
                            </div>
                            <div className="d-flex align-items-center mb-4">
                                <label htmlFor="dueDate" className="form-label me-3 mb-0">
                                    Due Date:
                                </label>
                                <input
                                    type="date"
                                    className="form-control bg-light text-muted" // Gray background + muted text
                                    id="dueDate"
                                    value={dueDate}
                                    readOnly
                                    style={{
                                        cursor: "not-allowed", // Changes cursor on hover
                                        border: "1px solid #dee2e6", // Lighter border
                                        opacity: .95 // Slightly transparent
                                    }}
                                />
                            </div>
                            <div className="d-flex align-items-center mb-4">
                                <label htmlFor="reminderInterval" className="form-label me-3 mb-0">
                                    Reminder Interval:
                                </label>
                                <select
                                    className="form-select"
                                    id="reminderInterval"
                                    value={reminderInterval}
                                    onChange={handleIntervalChange}
                                    required
                                >
                                    <option value="">Select interval</option>
                                    <option value="1-day">1 Day Before</option>
                                    <option value="3-days">3 Days Before</option>
                                    <option value="1-week">1 Week Before</option>
                                    <option value="2-weeks">2 Weeks Before</option>  
                                </select>
                            </div>
                            <div className="d-flex align-items-center mb-4">
                                <label htmlFor="reminderDate" className="form-label me-3 mb-0">
                                    Reminder Date:
                                </label>
                                <input
                                    type="date"
                                    className="form-control" // Gray background + muted text
                                    id="reminderDate"
                                    value={reminderDate}
                                    readOnly
                                />
                            </div>
                            <div className="d-flex justify-content-center gap-3">
                                <button type="submit" className="btn btn-outline-primary">Submit</button>
                                <Link className="btn btn-outline-danger" to="/tasks">Cancel</Link>

                                {title === "Update Reminder" && (
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => {
                                            if (window.confirm("Are you sure you want to delete this reminder?")) {
                                                removeReminder();
                                            }
                                        }}
                                    >
                                        Delete Reminder
                                    </button>
                                )}

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddReminder;