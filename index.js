// Mitul 8927992
// Karishma 8911439 -->
const express = require("express");
const session = require("express-session");
const { mongoose } = require("mongoose");
const controllers = require("./controller/controllers");
const authMiddleware = require("./middleware/authMiddleware");

const mongoDB =
  "mongodb+srv://karishma:Kari8488@fsp.pefgkbh.mongodb.net/musicstore";

try {
  mongoose.connect(mongoDB);
  console.log("Mongo DB Connected...!!!");
} catch (e) {
  console.log("Error In Connection: ", e);
}

const app = express();

app.use(
  session({
    secret: "musicstore",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

/* GET */

app.get("/", authMiddleware, controllers.dashboard);

app.get("/login", function (req, res) {
  res.render("login", {
    pageTitle: "Login",
    isValid: req.session?.token ? true : false,
  });
});

app.get("/logout", authMiddleware, controllers.logout);

app.get("/deletesong/:id", authMiddleware, controllers.deleteSong);

app.get("/buysong/:id", authMiddleware, controllers.buySong);

app.get("/orders", authMiddleware, controllers.myOrders);

/* POST */

app.post("/signup", controllers.signup);

app.post("/login", controllers.login);

app.post("/addsong", controllers.addSong);

app.listen(4000, () => {
  console.log("Application is running on http://localhost:4000 ...!!!");
});
