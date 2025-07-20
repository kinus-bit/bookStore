const express = require('express');
const router = express.Router();
const { createBook , getBook  , getAllBooks , updateBook , deleteBook } = require('../controllers/bookController');

router.post('/' , createBook);
router.get('/:id' , getBook);
router.get('/all', getAllBooks);
router.put('/:id' , updateBook);
router.delete('/:id' , deleteBook);


