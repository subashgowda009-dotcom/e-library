import React from 'react';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';
import { FiBook, FiCpu, FiHeart, FiBriefcase, FiAperture, FiClock, FiZap, FiSettings } from 'react-icons/fi';
import './Landing.css';

const categories = [
    { name: 'Fiction', icon: <FiBook />, count: '2,345', color: 'purple' },
    { name: 'Science', icon: <FiAperture />, count: '1,234', color: 'blue' },
    { name: 'Technology', icon: <FiCpu />, count: '1,876', color: 'green' },
    { name: 'Self-Help', icon: <FiHeart />, count: '1,543', color: 'orange' },
    { name: 'History', icon: <FiClock />, count: '1,002', color: 'pink' },
    { name: 'Business', icon: <FiBriefcase />, count: '1,850', color: 'indigo' },
    { name: 'Electrical', icon: <FiZap />, count: '1', color: 'yellow' },
    { name: 'Civil', icon: <FiSettings />, count: '5', color: 'teal' },
];

const Landing = () => {
    return (
        <div className="landing-page">
            <Hero />
            
            <section className="categories-section container">
                <div className="section-header">
                    <h2>Popular Categories</h2>
                    <Link to="/books" className="view-all">View All Categories →</Link>
                </div>
                
                <div className="categories-grid">
                    {categories.map((cat, idx) => (
                        <Link to={`/category/${cat.name.toLowerCase()}`} key={idx} className="category-card glass-card">
                            <div className={`cat-icon bg-${cat.color}`}>
                                {cat.icon}
                            </div>
                            <div className="cat-info">
                                <h3>{cat.name}</h3>
                                <p>{cat.count} Books</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Landing;
