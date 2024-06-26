// Mitul 8927992
// Karishma 8911439
const mongoose = require("mongoose");

// user have to buy songs for that which user is it which song is it and based on that song it'll create pdf which is basically receipt
const orderSchema = new mongoose.Schema({
  song: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "song",
    required: true,
  },
  auth: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
    required: true,
  },
  createdAt: {
    type: Date,
  },
});

const Order = mongoose.model("order", orderSchema);
module.exports = Order;
