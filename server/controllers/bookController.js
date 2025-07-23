const Book = require('../models/Book');

//create a book
exports.createBook = async(req,res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
        
    } catch (error) {
        res.status(404).json(error)
    }
};

//get one book
exports.getBook = async(req,res) => {
    try {
        const book = await Book.findById(req.params.id);
        if(!book) return res.status(404).json({message:'Not found'})
        res.status(200).json(book); 
    } catch (error) {
        res.status(500).json(error)   
    }
}

//Get a book(all)
exports.getAllBooks = async (req, res) => {
    try {
        console.log("✅ getAllBooks called");
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        console.error("❌ Error in getAllBooks:", error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

//update a book
exports.updateBook = async(req,res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id,req.body,{new:true ,runValidators:true});
         if(!book) return res.status(400).json({message:'Not found'})
        res.status(201).json(book);     
    } catch (error) {
        res.status(400).json(error)     
    }
}

//delete a book
exports.deleteBook = async(req,res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    if(!book) return res.status(400).json({message:'Not found'})
    res.status(201).json(book);   
}