// Mitul 8927992
// Karishma 8911439
const mongoose = require("mongoose");

// Schema for Artist
const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Artist = mongoose.model("artist", artistSchema);
module.exports = Artist;
