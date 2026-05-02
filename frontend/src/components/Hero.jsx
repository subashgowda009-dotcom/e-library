import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiPlayCircle, FiBookOpen, FiUsers, FiLayers, FiAward } from 'react-icons/fi';
import './Hero.css';

const Hero = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <section className="hero">
            <div className="container hero-container">
                <div className="hero-content">
                    <div className="badge glass-card">
                        <span className="sparkle">✦</span> Your Gateway to Knowledge
                    </div>
                    <h1 className="hero-title">
                        Read. Learn.<br/>Grow <span className="gradient-text">Together.</span>
                    </h1>
                    <p className="hero-subtitle">
                        Access a specialized collection of resources and research papers tailored for Civil and Electrical engineering.
                    </p>
                    
                    <form className="hero-search glass-card" onSubmit={handleSearch}>
                        <FiSearch className="search-icon" />
                        <input 
                            type="text" 
                            placeholder="Search by title, author or category..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="btn-primary">Search</button>
                    </form>
                    
                    <div className="hero-actions">
                        <button className="btn-primary" onClick={() => navigate('/books')}>
                            Explore Books →
                        </button>
                        <button className="btn-outline">
                            <FiPlayCircle /> How It Works
                        </button>
                    </div>
                </div>
                <div className="hero-image">
                    {/* Mocks the visual of the tablet and books from the UI */}
                    <div className="image-placeholder">
                        <div className="tablet-mockup glass-card">
                            <div className="tablet-screen">
                                <small>eLibrary</small>
                                <h3>The Power of Knowledge</h3>
                                <p>Unlock new worlds, one page at a time.</p>
                                <button className="btn-primary btn-small">Start Reading</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            

        </section>
    );
};

export default Hero;
