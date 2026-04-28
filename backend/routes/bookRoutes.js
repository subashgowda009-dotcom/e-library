const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', bookController.getAllBooks);
router.get('/search', bookController.searchBooks);
router.get('/category/:category', bookController.filterByCategory);
router.get('/:id', bookController.getBookById);

const cpUpload = upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'pdfFile', maxCount: 1 }]);
router.post('/', ensureAuthenticated, cpUpload, bookController.createBook);

module.exports = router;
