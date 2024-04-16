// Mitul 8927992
// Karishma 8911439
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

// Auth Table
const AuthSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
});

// all user wil be unique
AuthSchema.plugin(uniqueValidator);

const Auth = mongoose.model("auth", AuthSchema);
module.exports = Auth;
