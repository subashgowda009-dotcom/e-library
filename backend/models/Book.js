const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String, // Cloudinary PDF URL
        required: true
    },
    coverImage: {
        type: String, // Cloudinary Image URL
        required: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

BookSchema.index({ title: 'text', author: 'text', category: 'text' });

module.exports = mongoose.model('Book', BookSchema);
