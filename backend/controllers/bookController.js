const Book = require('../models/Book');

exports.createBook = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized, please log in' });
        }

        const { title, author, category, description } = req.body;
        
        if (!req.files || !req.files.coverImage || !req.files.pdfFile) {
            return res.status(400).json({ message: 'Cover image and PDF file are required' });
        }
        
        const coverImageUrl = req.files.coverImage[0].path;
        const pdfFileUrl = req.files.pdfFile[0].path;

        const newBook = new Book({
            title,
            author,
            category,
            description,
            coverImage: coverImageUrl,
            fileUrl: pdfFileUrl,
            uploadedBy: req.user._id
        });

        await newBook.save();
        res.status(201).json({ message: 'Book created successfully', book: newBook });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('uploadedBy', 'username');
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.searchBooks = async (req, res) => {
    try {
        const keyword = req.query.q;
        if (!keyword) {
            return res.status(400).json({ message: 'Search query parameter q is required' });
        }
        const books = await Book.find({
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { author: { $regex: keyword, $options: 'i' } },
                { category: { $regex: keyword, $options: 'i' } }
            ]
        });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.filterByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const books = await Book.find({ category: { $regex: new RegExp(`^${category}$`, 'i') } });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
