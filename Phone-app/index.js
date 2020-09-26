require("dotenv").config();
const express = require("express");
let ejs = require("ejs");
var morgan = require("morgan");

var cookieParser = require("cookie-parser");
var phone = require("./routes/phone.route");
var web = require("./routes/phone.web");
var products = require("./routes/products.web.route");
var loginRoute = require("./routes/auth.route");
var users = require("./routes/users.route");
var authenication = require("./middleware/authenication");
const cors = require("cors");
const KEY_COOKIE = process.env.KEY_COOKIE;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(KEY_COOKIE));
app.use("/phone", phone);
app.use("/", users);
app.use("/web", authenication.authenToken, web);
app.use("/products", products);
app.use("/login", loginRoute);
app.use(express.static("public"));

app.set("view engine", "pug");
app.set("views", "./views");
const port = 3000;
// middleware

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
