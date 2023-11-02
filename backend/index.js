const express = require('express');
const mongoose = require('mongoose');
const { PORT, mongoDBURL } = require('./config');
const booksRoute = require('./routes/booksRoutes');
const app = express();

//Middleware for parsing request body
app.use(express.json());

app.get('/', (req, res) => {
    console.log("Hello");
    return res.status(234).send("Welcome to my house");
})

app.use('/book',booksRoute);

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
