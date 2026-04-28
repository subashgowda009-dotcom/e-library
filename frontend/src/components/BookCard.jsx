import React from 'react';
import { Link } from 'react-router-dom';
import './BookCard.css';

const BookCard = ({ book }) => {
    return (
        <div className="book-card glass-card">
            <Link to={`/books/${book._id}`}>
                <div className="book-cover">
                    <img src={book.coverImage} alt={book.title} />
                    <div className="book-category-badge">{book.category}</div>
                </div>
                <div className="book-info">
                    <h4>{book.title}</h4>
                    <p className="book-author">{book.author}</p>
                </div>
            </Link>
        </div>
    );
};

export default BookCard;
