const shortid = require("shortid");
// config low db
const db = require("../db");
const data = db.get("phone");

module.exports.postPerson = (req, res) => {
  res.render("phones/createPhone.pug", {
    message: "tung",
  });
};
