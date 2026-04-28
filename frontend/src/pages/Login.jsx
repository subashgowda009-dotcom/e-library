import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/login', { username, password }, { withCredentials: true });
            login(data.user);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="auth-page container">
            <div className="auth-card glass-card">
                <h2>Welcome Back</h2>
                <p>Login to your account to continue</p>
                
                {error && <div className="auth-error">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn-primary auth-btn">Login</button>
                </form>
                
                <p className="auth-redirect">Don't have an account? <Link to="/signup">Sign up</Link></p>
            </div>
        </div>
    );
};

export default Login;
