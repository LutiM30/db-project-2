// Mitul 8927992
// Karishma 8911439
const mongoose = require("mongoose");

// Schema for Genre
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Genre = mongoose.model("genre", genreSchema);
module.exports = Genre;
