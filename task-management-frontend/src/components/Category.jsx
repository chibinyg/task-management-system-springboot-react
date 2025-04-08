import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Category = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, [])

  async function getCategories() {
    try {
      const response = await axios.get("http://localhost:8080/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  async function deleteCategory(id) {
    if (window.confirm(`Are you sure you want to delete ${categories.find(category => category.id === id).name.trim()}?
    \nIt will delete all tasks within this category`)) {
      try {
        await axios.delete(`http://localhost:8080/categories/${id}`);
        getCategories();
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  }

  return (
    <div>
      <div className="container">
        <Link className="btn btn-primary mt-3 mb-1" to="/add-category">Add Category</Link>
        <table className="table caption-top table-warning table-bordered table-hover">
          <caption className="text-center">Manage Categories to Create Tasks</caption>
          <thead>
            <tr>
              <th>Category Id</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              categories.map(category =>
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>
                    <Link className="btn btn-outline-primary mx-2" to={`/categories/${category.id}/add-task`}>Add Task</Link>
                    <Link className="btn btn-outline-primary mx-2" to={`/edit-category/${category.id}`}>Edit</Link>
                    <button className="btn btn-outline-danger mx-2" onClick={() => deleteCategory(category.id)}>Delete</button>
                  </td>
                </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Category