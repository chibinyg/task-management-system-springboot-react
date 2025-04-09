import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getCategoryById, addCategory, updateCategory } from '../services/CategoryService.js';

const AddOrEditCategory = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");

    const category = { name };

    // This hook is to extract URL parameters from a router
    const { id } = useParams();

    // Populate the form with existing data if id is present
    useEffect(() => {
        if (id) {
            fetchCategoryById(id);
        }
    }, [id])

    // Fecth the category data from the server by id
    async function fetchCategoryById(id) {
        try {
            const response = await getCategoryById(id);
            setName(response.data.name);
        } catch (error) {
            console.error("Error fetching category:", error);
            alert("Error fetching category", error);
        }
    }

    async function createOrUpdate(e) {
        e.preventDefault();
        if (!id) {
            // If id is not present, create a new category
            try {
                await addCategory(category);
                navigate("/categories");
            } catch (error) {
                console.error("Error saving category:", error);
                alert("Error saving category", error);
            }
        } else {
            // If id is present, update the existing category
            try {
                await updateCategory(id, category);
                navigate("/categories");
            } catch (error) {
                console.error("Error updating category:", error);
                alert("Error updating category", error);
            }
        }
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="card col-md-6 offset-md-3">
                    <h2 className="text-center mt-3">{id ? "Edit " : "Add "}Category</h2>
                    <div className="card-body">
                        <form onSubmit={createOrUpdate}>
                            <div className="d-flex align-items-center mb-4">
                                <label htmlFor="category" className="form-label me-3 mb-0">
                                    Category:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="category"
                                    placeholder="Enter category name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
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

export default AddOrEditCategory