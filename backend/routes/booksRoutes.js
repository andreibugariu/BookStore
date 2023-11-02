const express = require('express');
const { Book } = require('../models/bookModel');

const router = express.Router();


//Post a book
router.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.year) {
            return res.status(400).send({message:"Send all reauired fields"})
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            year: req.body.year
        }
        const book = await Book.create(newBook);
        return res.status(201).send(book)
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
})

//Get all books from database
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).send({
            data: books,
            count: books.length,
        })
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
})

//Get one book by id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findById(id);
        res.status(200).send(book);
    } catch (err) {
        res.status(500).send({ message: err.message })
    };
})

//Update a book by id
router.put('/:id', async (req, res) => {
    try {
        
        const id = req.params.id;
        const new_book = await Book.findByIdAndUpdate(id, req.body)//imi da ala vechi
        
        if (!new_book) {
            return res.status(404).send({message:"Book not found"})
        }
        console.log(new_book)
        return res.status(200).send(new_book);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
})

//Delete a book by id
router.delete('/:id', async (req, res) => {
    try {  
        const id = req.params.id;
        const delete_book = await Book.deleteOne({ _id: id });
        if (!delete_book) {
           return res.status(404).send({ message: "can't delete the book" });
        }
        return res.status(200).send({message:`Successfully deleted book with id ${id}`});
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
})

module.exports = router;
