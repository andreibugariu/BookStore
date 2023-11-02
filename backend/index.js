const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { PORT, mongoDBURL } = require('./config');
const booksRoute = require('./routes/booksRoutes');
const app = express();

//Middleware for parsing request body
app.use(express.json());

//Allow All originds with deafult of cors(*);
// app.use(cors());
//Alow custom Origins, have more control over it
app.use(cors({
    origin: 'http://localhost:5555',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}))

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
