import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, saveLoggedInUser, storeToken} from '../services/AuthService.js'

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault();
        const user = { username, password };
        try {
            const response = await login(user);
            console.log(response.data);
            const token = 'Basic ' + window.btoa(username + ':' + password);
            storeToken(token);
            saveLoggedInUser(username);
            navigate("/home");
            window.location.reload(false);
        } catch (error) {
            console.error(error);
            window.alert("Invalid username or password");
        }
    }

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <div className='card'>
                        <div className='card-header'>
                            <h2 className='text-center'>Login</h2>
                        </div>
                        <div className='card-body'>
                            <form>
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
                                    <button className='btn btn-primary' onClick={(e) => handleLogin(e)}>Login</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login