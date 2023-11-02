const express = require('express');
const mongoose = require('mongoose');
const { PORT, mongoDBURL } = require('./config');
const {Book}=require('./models/bookModel')
const app = express();

//Middleware for parsing request body
app.use(express.json());

app.get('/', (req, res) => {
    console.log("Hello");
    return res.status(234).send("Welcome to my house");
})

//Post a book
app.post('/books', async (req, res) => {
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

app.get('/books', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).send(books)
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
})






mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("Successfully connecting to database ");
        app.listen(PORT, () => {
         console.log(`App is running on port: ${PORT}`)
        });
    })
    .catch((err) => {
        console.log("Cannot connect to database");
        console.log(err)
    })
