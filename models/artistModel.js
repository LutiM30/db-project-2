const mongoose = require('mongoose');

// Schema for Artist
const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Artist = mongoose.model('artist', artistSchema);
module.exports = Artist;