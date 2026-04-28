import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BookCard from '../components/BookCard';

const Category = () => {
    const { categoryName } = useParams();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooksByCategory = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`http://localhost:5000/api/books/category/${categoryName}`);
                setBooks(data);
            } catch (error) {
                console.error('Failed to fetch category books', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBooksByCategory();
    }, [categoryName]);

    return (
        <div className="home-page container">
            <div className="page-header">
                <h2 style={{ textTransform: 'capitalize' }}>{categoryName} Books</h2>
            </div>
            
            {loading ? (
                <div className="loading">Loading category...</div>
            ) : books.length > 0 ? (
                <div className="books-grid">
                    {books.map(book => <BookCard key={book._id} book={book} />)}
                </div>
            ) : (
                <div className="no-results">
                    <h3>No books available in this category yet.</h3>
                </div>
            )}
        </div>
    );
};

export default Category;
