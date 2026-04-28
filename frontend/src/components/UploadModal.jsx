import React, { useState } from 'react';
import axios from 'axios';
import { FiX } from 'react-icons/fi';
import './UploadModal.css';

const UploadModal = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('Civil');
    const [description, setDescription] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('category', category);
        formData.append('description', description);
        if (coverImage) formData.append('coverImage', coverImage);
        if (pdfFile) formData.append('pdfFile', pdfFile);

        try {
            await axios.post('http://localhost:5000/api/books', formData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setSuccess('Book uploaded successfully!');
            setTimeout(() => {
                onClose();
                // Reset form
                setTitle('');
                setAuthor('');
                setCategory('Civil');
                setDescription('');
                setCoverImage(null);
                setPdfFile(null);
                setSuccess('');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to upload book');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content glass-card">
                <button className="close-btn" onClick={onClose}><FiX /></button>
                <h2>Upload Book</h2>
                {error && <p className="error-msg">{error}</p>}
                {success && <p className="success-msg">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Author</label>
                        <input type="text" value={author} onChange={e => setAuthor(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select value={category} onChange={e => setCategory(e.target.value)} required>
                            <option value="Civil">Civil</option>
                            <option value="Electrical">Electrical</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} rows="3"></textarea>
                    </div>
                    <div className="form-group">
                        <label>Cover Image (JPG/PNG)</label>
                        <input type="file" accept="image/*" onChange={e => setCoverImage(e.target.files[0])} required />
                    </div>
                    <div className="form-group">
                        <label>PDF File</label>
                        <input type="file" accept="application/pdf" onChange={e => setPdfFile(e.target.files[0])} required />
                    </div>
                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'Uploading...' : 'Upload Book'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadModal;
