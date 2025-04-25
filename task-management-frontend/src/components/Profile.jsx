import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../services/UserService';

const Profile = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const user = {
      firstName,
      lastName,
      email
    };

    useEffect(() => {
        fetchUser();
    }, []);

    async function fetchUser() {
        try {
            const response = await getUser();
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setUsername(response.data.username);
            setEmail(response.data.email);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }

    async function updateProfile(e) {
        e.preventDefault();

        try {
            await updateUser(user);
            navigate("/profile"); 
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="card col-md-6 offset-md-3">
                    <h2 className="text-center mt-3">Edit Profile</h2>
                    <div className="card-body">
                        <form onSubmit={updateProfile}>
                            <div className="d-flex align-items-center mb-4">
                                <label htmlFor="firstName" className="form-label me-3 mb-0">
                                    First Name:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="d-flex align-items-center mb-4">
                                <label htmlFor="lastName" className="form-label me-3 mb-0">
                                    Last Name:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="d-flex align-items-center mb-4">
                                <label htmlFor="username" className="form-label me-3 mb-0">
                                    Username:
                                </label>
                                <input
                                    type="text"
                                    className="form-control bg-light text-muted"
                                    id="username"
                                    value={username}
                                    readOnly
                                />
                            </div>
                            <div className="d-flex align-items-center mb-4">
                                <label htmlFor="email" className="form-label me-3 mb-0">
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    pattern=".*@.*\.com"  
                                    title="Please enter a valid email ending with .com"
                                    required
                                />
                            </div>
                            <div className="d-flex justify-content-center gap-3">
                                <button type="submit" className="btn btn-outline-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;