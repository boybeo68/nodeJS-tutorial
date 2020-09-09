module.exports.authenToken = (req, res, next) => {
  const db = require("../db");
  const data = db.get("phone");
  if (!req.cookies.access_token) {
    return res.redirect("/login");
  }
  const findId = data.find({ id: req.cookies.access_token }).value();
  if (!findId) {
    return res.redirect("/login");
  }
  next();
};
