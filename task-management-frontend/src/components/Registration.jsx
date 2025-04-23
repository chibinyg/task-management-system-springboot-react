import React from 'react'
import { useState } from 'react'
import { register } from '../services/AuthService.js'
import { useNavigate } from 'react-router-dom'

const Registration = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const navigate = useNavigate()

    async function handleRegistration(e) {
        e.preventDefault();
        const user = { username, password, email, firstName, lastName };
        try {
            const response = await register(user);
            console.log(response.data);
            if (response.status === 200) {
                navigate("/login");
            } else {
                window.alert("Registration failed");
            }
        } catch (error) {
            console.error(error);
            window.alert("User already exists");
        }
    }

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <div className='card'>
                        <div className='card-header'>
                            <h2 className='text-center'>Registration</h2>
                        </div>
                        <div className='card-body'>
                            <form>
                                <div className='row mb-3'>
                                    <div className='col-md-6 mb-3 mb-md-0'>
                                        <label className='form-label'>First Name</label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            name='firstName'
                                            placeholder='Enter your first name'
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>

                                    <div className='col-md-6'>
                                        <label className='form-label'>Last Name</label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            name='lastName'
                                            placeholder='Enter your last name'
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <label className='col-md-3 control-label'>Username</label>
                                    <div className='col-md-9'>
                                        <input
                                            type='text'
                                            className='form-control'
                                            name='username'
                                            placeholder='Enter your username'
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <label className='col-md-3 control-label'>Email</label>
                                    <div className='col-md-9'>
                                        <input
                                            type='text'
                                            className='form-control'
                                            name='email'
                                            placeholder='Enter your email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <label className='col-md-3 control-label'>Password</label>
                                    <div className='col-md-9'>
                                        <input
                                            type='password'
                                            className='form-control'
                                            name='password'
                                            placeholder='Enter your password'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='form-group mb-3'>
                                    <button className='btn btn-primary' onClick={(e) => handleRegistration(e)}>Register</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div >
        </div >
    )
}

export default Registration