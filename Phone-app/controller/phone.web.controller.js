const shortid = require("shortid");
// config low db
const db = require("../db");
const data = db.get("phone");

module.exports.getPerson = (req, res) => {
  res.render("phones/createPhone", {
    message: "tung",
  });
};
module.exports.sendCookie = (req, res, next) => {
  res.cookie("access_token", "Bearer");
  res.send("hello");
};
module.exports.postPerson = (req, res) => {
  const body = req.body;
  let avatar = req.file.path.split("/").slice(1).join("/");
  const findName = data.find({ name: body.name }).value();
  if (findName) {
    return res.status(400).json({
      error: "The name already exists in the phonebook",
    });
  }
  const phone = {
    name: body.name,
    number: body.number,
    password: body.password,
    avatar,
    id: shortid.generate(),
  };
  data.unshift(phone).write();
  res.redirect("/");
};
