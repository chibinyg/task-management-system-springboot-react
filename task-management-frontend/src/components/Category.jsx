import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCategories, deleteCategory} from '../services/CategoryService'

const Category = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, [])

  async function fetchCategories() {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  async function removeCategory(id) {
    if (window.confirm(`Are you sure you want to delete ${categories.find(category => category.id === id).name.trim()}?
    \nIt will delete all tasks within this category`)) {
      try {
        await deleteCategory(id);
        fetchCategories();
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  }

  return (
    <div>
      <div className="container">
        <Link className="btn btn-primary mt-3 mb-1" to="/add-category">Add Category</Link>
        <table className="table caption-top table-success table-bordered table-hover">
          <caption className="text-center">Manage Categories to Create Tasks</caption>
          <thead>
            <tr>
              {/* <th>Category Id</th> */}
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              categories.map(category =>
                <tr key={category.id}>
                  {/* <td>{category.id}</td> */}
                  <td>{category.name}</td>
                  <td>
                    <Link className="btn btn-outline-primary mx-2" to={`/categories/${category.id}/add-task`}
                    state={{categoryName: category.name}}>Add Task</Link>
                    <Link className="btn btn-outline-primary mx-2" to={`/edit-category/${category.id}`}>Edit</Link>
                    <button className="btn btn-outline-danger mx-2" onClick={() => removeCategory(category.id)}>Delete</button>
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