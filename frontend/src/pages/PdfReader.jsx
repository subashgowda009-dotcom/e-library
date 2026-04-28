import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FiArrowLeft } from 'react-icons/fi';
import './PdfReader.css';

const PdfReader = () => {
    const { id } = useParams();
    const [pdfUrl, setPdfUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/books/${id}`);
                setPdfUrl(data.fileUrl);
            } catch (error) {
                console.error('Failed to fetch book pdf', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]);

    if (loading) return <div className="loading container">Loading secure viewer...</div>;
    if (!pdfUrl) return <div className="container">Pdf file not found.</div>;

    return (
        <div className="pdf-reader-page">
            <div className="reader-header glass-card">
                <Link to={`/books/${id}`} className="back-btn"><FiArrowLeft /> Back to Book</Link>
                <h3>Reading Mode</h3>
                <div style={{ width: 100 }}></div>
            </div>
            
            <div className="pdf-container">
                <iframe 
                    src={`${pdfUrl}#toolbar=0`} 
                    title="PDF Viewer"
                    width="100%" 
                    height="100%" 
                    style={{ border: 'none' }}
                ></iframe>
            </div>
        </div>
    );
};

export default PdfReader;
