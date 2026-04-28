import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { FiSearch } from 'react-icons/fi';
import './Home.css';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    
    const location = useLocation();
    
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const search = queryParams.get('search');
        if (search) {
            setSearchQuery(search);
            fetchBooks(search);
        } else {
            fetchBooks('');
        }
    }, [location.search]);

    const fetchBooks = async (query) => {
        try {
            setLoading(true);
            const url = query ? `${import.meta.env.VITE_API_URL}/books/search?q=${query}` : `${import.meta.env.VITE_API_URL}/books`;
            const { data } = await axios.get(url);
            setBooks(data);
        } catch (error) {
            console.error('Failed to fetch books', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchBooks(searchQuery);
    };

    return (
        <div className="home-page container">
            <div className="page-header">
                <h2>Explore Books</h2>
                <form className="page-search glass-card" onSubmit={handleSearch}>
                    <FiSearch className="icon" />
                    <input 
                        type="text" 
                        placeholder="Search books..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="btn-primary">Search</button>
                </form>
            </div>

            {loading ? (
                <div className="loading">Loading books...</div>
            ) : books.length > 0 ? (
                <div className="books-grid">
                    {books.map(book => <BookCard key={book._id} book={book} />)}
                </div>
            ) : (
                <div className="no-results">
                    <h3>No books found.</h3>
                    <p>Try adjusting your search criteria.</p>
                </div>
            )}
        </div>
    );
};

export default Home;
