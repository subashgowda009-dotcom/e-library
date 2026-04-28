import React from 'react';

const About = () => {
    return (
        <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', maxWidth: '800px' }}>
            <div className="glass-card" style={{ padding: '3rem' }}>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>About eLibrary</h2>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                    Welcome to eLibrary, your premium destination for consuming knowledge. 
                    We believe that education should be accessible and visually inspiring.
                </p>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                    Our platform offers a seamless reading experience with a curated collection of 
                    eBooks across multiple genres including Technology, Science, Fiction, and more. 
                    Built with modern web technologies, we aim to provide you with the best digital 
                    reading environment possible.
                </p>
            </div>
        </div>
    );
};

export default About;
