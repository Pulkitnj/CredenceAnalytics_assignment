const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://pulkitjain:5rwetTegaoBbbLtW@cluster0.up6tp1a.mongodb.net/movies')

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true
    }
})

const movies = mongoose.model('Movie', movieSchema);

module.exports = {
    movies
};