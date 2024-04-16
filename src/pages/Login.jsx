import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

import { signUp } from '../store/actions/authActions'
import { authFailure } from "../store/userSlice"

const Login = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.auth.isLoading);
    const error = useSelector((state) => state.auth.error);

    const [credentials, setCredentials] = useState({
      password: '',
      email: ''
    });

    const handleChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (ev) => {
        ev.preventDefault()
        
        if (!credentials.email) {
            alert('Please enter your email')
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
            <h2>Login to continue</h2>

            <form action="/login" method="POST" onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={credentials.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} />
                
                <button type="submit">
                    {isLoading ? 'Loading...' : 'Login'}
                </button>
            </form>

            <p>Already have an account? <NavLink to="/register">Register</NavLink></p>
        </div>
    )
}

export default Login