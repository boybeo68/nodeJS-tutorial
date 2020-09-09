const shortid = require("shortid");
// config low db
const db = require("../db");
const data = db.get("phone");

module.exports.getViewLogin = (req, res) => {
  res.render("auth/login", {
    message: "tung",
  });
};
module.exports.login = (req, res) => {
  const body = req.body;
  const findName = data.find({ name: body.name }).value();
  const password = data.find({ password: body.password }).value();
  let error = [];
  if (!findName) {
    error.push("Name is note exist");
    return res.render("auth/login", {
      error: error,
      name: body.name ? body.name : "",
      password: body.password ? body.password : "",
    });
  }
  if (findName.password !== body.password) {
    console.log(findName.password, body);
    error.push("Wrong passWord");
    return res.render("auth/login", {
      error: error,
      name: body.name ? body.name : "",
      password: body.password ? body.password : "",
    });
  }
  res.cookie("access_token", findName.id);
  res.redirect("/");
};
