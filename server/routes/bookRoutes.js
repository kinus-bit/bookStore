const express = require('express');
const router = express.Router();
const { createBook , getBook  , getAllBooks , updateBook , deleteBook } = require('../controllers/bookController');
const { protect , authorize } = require('../middleware/auth');

router.post('/' ,protect, createBook);
router.get('/:id' , protect , getBook);
router.get('/all', protect , getAllBooks);
router.put('/:id' , protect , authorize(['admin']) , updateBook);
router.delete('/:id' , protect , authorize(['admin']) , deleteBook);

module.exports = router;
