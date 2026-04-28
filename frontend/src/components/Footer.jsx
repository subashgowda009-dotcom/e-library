import React from 'react';
import { FiBookOpen } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer style={{ background: 'var(--bg-secondary)', padding: '3rem 0', marginTop: 'auto', borderTop: '1px solid var(--glass-border)' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: '700' }}>
                    <FiBookOpen style={{ color: 'var(--accent-secondary)' }} />
                    eLibrary
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    &copy; {new Date().getFullYear()} eLibrary Platform. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
