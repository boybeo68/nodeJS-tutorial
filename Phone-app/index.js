require("dotenv").config();
const express = require("express");
var cookieParser = require("cookie-parser");
const cors = require("cors");
const KEY_COOKIE = process.env.KEY_COOKIE;
// import router
var phone = require("./routes/phone.route");
var web = require("./routes/phone.web");
var products = require("./routes/products.web.route");
var loginRoute = require("./routes/auth.route");
var users = require("./routes/users.route");
var mongoRoute = require("./routes/mongo.route");

// middleware
var authenication = require("./middleware/authenication");
var createSession = require("./middleware/createSession");
var otherMiddleWare = require("./middleware/otherMiddleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(KEY_COOKIE));
app.use(createSession);
app.use("/phone", phone);
app.use("/", users);
app.use("/web", authenication.authenToken, web);
app.use("/products", products);
app.use("/login", loginRoute);
app.use("/mongo", mongoRoute);
app.use(express.static("public"));

app.set("view engine", "pug");
app.set("views", "./views");
const port = 3000;
// middleware
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://tung2:t1vo37a4fv0psqQC@cluster0.fby82.mongodb.net/firstdb?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true},function(err){
  if(err){
    console.log('ket noi bi loi', err)
  }else {
    console.log('connect thanh cong')
  }
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
