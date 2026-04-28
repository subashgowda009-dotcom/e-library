require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/Book');
const path = require('path');
const fs = require('fs');

const connectDB = require('./config/db');

const files = [
    { name: 'is.10262.2009.pdf', category: 'Civil' },
    { name: 'is.1343.1980 (1).pdf', category: 'Civil' },
    { name: 'is.456.2000.pdf', category: 'Civil' },
    { name: 'is.732.1989.pdf', category: 'Electrical' },
    { name: 'is.800.2007.pdf', category: 'Civil' },
    { name: 'is.875.1.1987.pdf', category: 'Civil' }
];

const uploadFiles = async () => {
    await connectDB();
    
    for (let file of files) {
        console.log(`Processing ${file.name}...`);
        try {
            const newBook = new Book({
                title: file.name.replace('.pdf', ''),
                author: 'Indian Standard',
                category: file.category,
                description: `Standard code document for ${file.category} engineering.`,
                coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2574&auto=format&fit=crop',
                fileUrl: `http://localhost:5000/uploads/${file.name}`
            });
            
            await newBook.save();
            console.log(`Saved to DB: ${newBook.title}`);
            
        } catch (err) {
            console.error(`Error saving ${file.name}:`, err);
        }
    }
    
    console.log('Upload complete.');
    process.exit(0);
};

uploadFiles();
