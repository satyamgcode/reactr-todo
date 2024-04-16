import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

import { signUp } from '../store/actions/authActions'
import { authFailure } from "../store/userSlice"

const Register = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.auth.isLoading);
    const error = useSelector((state) => state.auth.error);

    const [credentials, setCredentials] = useState({
      username: '',
      password: '',
      name: '',
      email: ''
    });

    const handleChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (ev) => {
        ev.preventDefault()
        
        if (!credentials.name) {
            alert('Please enter your name')
        }
        else if (!credentials.email) {
            alert('Please enter your email')
        }
        else if (!credentials.username) {
            alert('Please enter your username')
        }
        else if (!credentials.password) {
            alert('Please enter your password')
        }
        else {
            dispatch(signUp(credentials))
        }
    }

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(authFailure(null))
        }
    }, [dispatch, error])

    return (
        <div className="container auth">
            <h2>Create new account</h2>

            <form action="/register" method="POST" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Full name" value={credentials.name} onChange={handleChange} />
                <input type="text" name="username" placeholder="Username" value={credentials.username} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" value={credentials.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} />
                
                <button type="submit">
                    {isLoading ? 'Loading...' : 'Create account'}
                </button>
            </form>

            <p>Already have an account? <NavLink to="/login">Login</NavLink></p>
        </div>
    )
}

export default Register