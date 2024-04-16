// Mitul 8927992
// Karishma 8911439
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Auth = require("../models/authModel");
const Song = require("../models/songModel");
const Artist = require("../models/artistModel");
const Genre = require("../models/genreModel");
const Order = require("../models/orderModel");
const PDFDocument = require("pdfkit");
const fs = require("fs");

exports.dashboard = async (req, res) => {
  let songs = await Song.find({})
    .sort({ uploadedAt: -1 })
    .populate("artist")
    .populate("genre");
  let artists = await Artist.find({}).sort({ name: 1 });
  let genres = await Genre.find({}).sort({ name: 1 });

  res.render(
    req.user.userType.toLowerCase() === "admin" ? "admindashboard" : "index",
    {
      pageTitle: "Dashboard",
      isValid: req.session?.token ? true : false,
      user: req.user,
      songs,
      artists,
      genres,
    }
  );
};

exports.signup = async (req, res) => {
  try {
    const { signupUsername, signupPassword, userType } = req.body;

    const existingUser = await Auth.findOne({ username: signupUsername });
    if (existingUser) {
      throw new Error("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(signupPassword, 10);

    const user = new Auth({
      username: signupUsername,
      password: hashedPassword,
      userType,
    });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { loginUsername, loginPassword } = req.body;

    const user = await Auth.findOne({ username: loginUsername });
    if (!user) {
      throw new Error("User Not Exists.");
    }

    const isMatch = await bcrypt.compare(loginPassword, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    var token = jwt.sign({ _id: user._id }, "musicstore");
    req.session.token = token;

    res.status(200).json({ user, message: "User logged in successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.logout = (req, res) => {
  try {
    req.session.destroy(function (err) {
      if (err) {
        throw new Error("Error logging out.");
      }
    });

    res.redirect("/login");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addSong = async (req, res) => {
  try {
    const {
      title,
      artist,
      newArtist,
      genre,
      newGenre,
      price,
      releaseYear,
      songURL,
    } = req.body;

    // Check if artist exists or create a new one
    let a;
    if (newArtist) {
      a = new Artist({ name: newArtist });
      await a.save();
    } else {
      a = await Artist.findById(artist);
      console.log(a);
    }

    // Check if genre exists or create a new one
    let g;
    if (newGenre) {
      g = new Genre({ name: newGenre });
      await g.save();
    } else {
      g = await Genre.findById(genre);
    }

    // Create a new song
    const newSong = new Song({
      title,
      artist: a._id,
      genre: g._id,
      releaseYear,
      price,
      songURL,
      uploadedAt: new Date(),
    });
    await newSong.save();

    res.redirect("/");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSong = async (req, res) => {
  const song = await Song.findByIdAndDelete(req.params.id);
  res.redirect("/");
};

exports.buySong = async (req, res) => {
  const songId = req.params.id;
  const userId = req.user.id;

  const order = new Order({
    song: songId,
    auth: userId,
    createdAt: new Date(),
  });
  await order.save();

  const song = await Song.findById(songId).populate("artist").populate("genre");

  generateInvoice(order, song, res);
};

exports.myOrders = async (req, res) => {
  const orders = await Order.find({ auth: req.user._id })
    .populate({
      path: "song",
      populate: [
        { path: "artist", select: "name" },
        { path: "genre", select: "name" },
      ],
    })
    .sort({ createdAt: -1 });

  res.render("orders", {
    pageTitle: "My Orders",
    isValid: req.session?.token ? true : false,
    user: req.user,
    orders,
  });
};

function generateInvoice(order, song, res) {
  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="invoice_${order._id}.pdf"`
  );

  // Pipe the PDF content to the response
  doc.pipe(res);

  doc.fontSize(18).text("Music Store", { align: "center" });
  doc.moveDown();

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  doc.fontSize(16).text(`Invoice - ${currentDate}`, { align: "center" });
  doc.moveDown();

  const tableTop = 200;
  const tableLeft = 50;
  const columnWidth = 200;

  const rowHeight = 20;
  const properties = ["Song Title", "Artist", "Genre", "Release Year", "Paid"];
  const values = [
    song.title,
    song.artist.name,
    song.genre.name,
    song.releaseYear,
    `${song.price} CAD`,
  ];
  let currentY = tableTop + rowHeight;

  doc.font("Helvetica").fontSize(12);
  for (let i = 0; i < properties.length; i++) {
    doc.text(properties[i], tableLeft, currentY);
    doc.text(values[i], tableLeft + columnWidth, currentY);
    currentY += rowHeight;
  }

  doc.moveDown();
  doc.fontSize(12).text("Thank you for your purchase!", { align: "center" });

  // End the document
  doc.end();
}
