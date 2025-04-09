import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { isUserLoggedIn, logout } from '../services/AuthService.js'

const Header = () => {

    const isAuth = isUserLoggedIn();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">Task Management System</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {isAuth &&
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/home">Home</NavLink>
                                </li>
                            }
                            {isAuth &&
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/categories">Categories</NavLink>
                                </li>
                            }
                            {isAuth &&
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/tasks">Tasks</NavLink>
                                </li>
                            }
                            {isAuth &&
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/profile">Profile</NavLink>
                                </li>
                            }
                        </ul>
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            {!isAuth &&
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/register">Register</NavLink>
                                </li>
                            }
                            {!isAuth &&
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">Login</NavLink>
                                </li>
                            }
                            {isAuth &&
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login" onClick={handleLogout}>Logout</NavLink>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header