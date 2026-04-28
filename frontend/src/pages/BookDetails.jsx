import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FiBook, FiUser, FiTag, FiClock } from 'react-icons/fi';
import './BookDetails.css';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/books/${id}`);
                setBook(data);
            } catch (error) {
                console.error('Failed to fetch book', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]);

    if (loading) return <div className="loading container">Loading book details...</div>;
    if (!book) return <div className="container">Book not found.</div>;

    return (
        <div className="book-details-page container">
            <div className="book-details-container glass-card">
                <div className="book-details-cover">
                    <img src={book.coverImage} alt={book.title} />
                </div>
                <div className="book-details-info">
                    <h2>{book.title}</h2>
                    <div className="meta-info">
                        <span><FiUser /> {book.author}</span>
                        <span><FiTag /> {book.category}</span>
                        <span><FiClock /> {new Date(book.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="book-description">
                        <h3>Description</h3>
                        <p>{book.description}</p>
                    </div>
                    
                    <div className="book-actions">
                        <Link to={`/read/${book._id}`} className="btn-primary">
                            <FiBook /> Read PDF Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
