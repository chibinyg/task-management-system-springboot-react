import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import Category from './components/Category.jsx'
import AddOrEditCategory from './components/AddOrEditCategory.jsx'
import Task from './components/Task.jsx'
import AddTask from './components/AddTask.jsx'
import EditTask from './components/EditTask.jsx'
import Profile from './components/Profile.jsx'
import AddReminder from './components/AddReminder.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* http://localhost:3000/ */}
          <Route path="/" element={<Home />} />

          {/* http://localhost:3000/categories */}
          <Route path="/categories" element={<Category />} />

          {/* http://localhost:3000/add-category */}
          <Route path="/add-category" element={<AddOrEditCategory />} />

          {/* http://localhost:3000/edit-category/{id} */}
          <Route path="/edit-category/:id" element={<AddOrEditCategory />} />

          {/* http://localhost:3000/tasks */}
          <Route path="/tasks" element={<Task />} />

          {/* http://localhost:3000/categories/{categoryId}/add-task */}
          <Route path="/categories/:categoryId/add-task" element={<AddTask />} />

          {/* http://localhost:3000/edit-task/{id} */}
          <Route path="/edit-task/:id" element={<EditTask/>} />

          {/* http://localhost:3000/add-reminder/{id} */}      
          <Route path="/add-reminder/:id" element={<AddReminder />} />

          {/* http://localhost:3000/profile */}
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
