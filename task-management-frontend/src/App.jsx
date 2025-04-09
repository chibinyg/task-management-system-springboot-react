import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './components/Home.jsx'
import Category from './components/Category.jsx'
import AddOrEditCategory from './components/AddOrEditCategory.jsx'
import Task from './components/Task.jsx'
import AddTask from './components/AddTask.jsx'
import EditTask from './components/EditTask.jsx'
import Profile from './components/Profile.jsx'
import Registration from './components/Registration.jsx'
import Login from './components/Login.jsx'
import { isUserLoggedIn } from './services/AuthService.js'

function App() {

  // Protect the routes that need authentication
  function AuthenticatedRoute({ children }) {

    const isAuth = isUserLoggedIn();

    if (isAuth) {
      return children;
    }

    return <Navigate to="/" />

  }

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* http://localhost:3000/ */}
          <Route path="/" element={<Login />} />

          {/* http://localhost:3000/home */}
          <Route path="/home" element={
            <AuthenticatedRoute>
              <Home />
            </AuthenticatedRoute>
          } />

          {/* http://localhost:3000/categories */}
          <Route path="/categories" element={
            <AuthenticatedRoute>
              <Category />
            </AuthenticatedRoute>
          } />

          {/* http://localhost:3000/add-category */}
          <Route path="/add-category" element={
            <AuthenticatedRoute>
              <AddOrEditCategory />
            </AuthenticatedRoute>
          } />

          {/* http://localhost:3000/edit-category/{id} */}
          <Route path="/edit-category/:id" element={
            <AuthenticatedRoute>
              <AddOrEditCategory />
            </AuthenticatedRoute>
          } />

          {/* http://localhost:3000/tasks */}
          <Route path="/tasks" element={
            <AuthenticatedRoute>
              <Task />
            </AuthenticatedRoute>
          } />

          {/* http://localhost:3000/categories/{categoryId}/add-task */}
          <Route path="/categories/:categoryId/add-task" element={
            <AuthenticatedRoute>
              <AddTask />
            </AuthenticatedRoute>
          } />

          {/* http://localhost:3000/edit-task/{id} */}
          <Route path="/edit-task/:id" element={
            <AuthenticatedRoute>
              <EditTask />
            </AuthenticatedRoute>
          } />

          {/* http://localhost:3000/profile */}
          <Route path="/profile" element={
            <AuthenticatedRoute>
              <Profile />
            </AuthenticatedRoute>
          } />

          {/* http://localhost:3000/register */}
          <Route path="/register" element={<Registration />} />

          {/* http://localhost:3000/login */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
