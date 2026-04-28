import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiBookOpen, FiSearch, FiMenu, FiX, FiUpload } from 'react-icons/fi';
import axios from 'axios';
import './Navbar.css';
import UploadModal from './UploadModal';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await axios.get(`${import.meta.env.VITE_API_URL}/auth/logout`, { withCredentials: true });
            logout();
            navigate('/');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <>
            <nav className="navbar glass-card">
                <div className="container nav-container">
                    <Link to="/" className="nav-logo" onClick={() => setIsMobileMenuOpen(false)}>
                        <FiBookOpen className="logo-icon" />
                        <span>eLibrary</span>
                    </Link>
                    
                    <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <FiX /> : <FiMenu />}
                    </button>

                    <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                        <ul className="nav-links">
                            <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
                            <li><Link to="/books" onClick={() => setIsMobileMenuOpen(false)}>Books</Link></li>
                            <li><Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link></li>
                        </ul>
                        <div className="nav-actions">
                            <Link to="/books" className="search-icon" onClick={() => setIsMobileMenuOpen(false)}><FiSearch /></Link>
                            {user && user.username === 'admin' && (
                                <button className="btn-primary upload-btn" onClick={() => { setIsUploadModalOpen(true); setIsMobileMenuOpen(false); }}>
                                    <FiUpload /> Upload
                                </button>
                            )}
                            {user ? (
                                <>
                                    <span className="user-greeting">Hi, {user.username}</span>
                                    <button className="btn-outline" onClick={handleLogout}>Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="btn-outline" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                                    <Link to="/signup" className="btn-primary" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <UploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
        </>
    );
};

export default Navbar;
