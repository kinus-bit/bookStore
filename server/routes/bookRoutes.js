const express = require('express');
const router = express.Router();
const { createBook , getBook  , getAllBooks , updateBook , deleteBook } = require('../controllers/bookController');
const { protect , authorize } = require('../middleware/auth');

//today i found an error in the code that you cannot start with get /:id before get /all because
//  the /all is thought to be a id and then there will be no id called all so you will get an error 
// and you will not be able to load your data from database .
//2 days debugging and i found this error and i fixed it ,what a joy😂😂😂!
router.post('/' ,protect, createBook);
router.get('/all', protect , getAllBooks);
router.get('/:id' ,protect, getBook);
router.put('/:id' , protect , authorize(['admin']) , updateBook);
router.delete('/:id' , protect , authorize(['admin']) , deleteBook);

module.exports = router;
