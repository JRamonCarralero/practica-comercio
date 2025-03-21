import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAPIData } from "../utils/utils";
import { useUserContext } from "../context/UserProvider";
import "../css/Login.css";

/**
 * A simple login form that sends a POST request to
 * http://localhost:3333/login with the email and password
 * in the request body, and stores the response in
 * session storage as 'user'.
 *
 * @returns {JSX.Element} The login form component.
 */
function Login({ onSetIsAdmin, onSetIsLoggedIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { loginUser } = useUserContext();

    const navigate = useNavigate();

    /**
     * Handles the form submission event.
     * Prevents the default form submission behavior, sends a
     * login request to the server, and if the login data is valid,
     * stores the user in session storage and navigates to the
     * products page. If the login data is invalid, shows an
     * alert message.
     * 
     * @param {Event} e - The form submission event
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password
        }
        const user = await getAPIData('http://localhost:3333/login', 'POST', JSON.stringify(data));
        if (user) {
            sessionStorage.setItem('user', JSON.stringify(user));
            loginUser(user);
            if (user.role === 'admin') {
                onSetIsAdmin(true);
            }
            onSetIsLoggedIn(true);
            navigate('/products')
        } else {
            alert('Invalid email or password');
        }
        
    };

    return (
        <div className="login-container" onSubmit={handleSubmit}>
            <h1 className="login-title">Login</h1>
            <form className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="login-btn">Login</button>
            </form>
        </div>
    );
}

export default Login;