const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'artist',
        required: true
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'genre',
        required: true
    },
    releaseYear: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    songURL: {
        type: String,
        required: true
    },
    uploadedAt: {
        type: Date
    }
});

const Song = mongoose.model('song', songSchema);
module.exports = Song;
