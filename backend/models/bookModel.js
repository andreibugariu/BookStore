const mongoose = require('mongoose');

const BookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        author: {
            type: String,
            require: true,
        },
        publishYear: {
            type: Number,
            require: true,
        }
    },
);

const Book = mongoose.model('Books', BookSchema);
module.exports = { Book };