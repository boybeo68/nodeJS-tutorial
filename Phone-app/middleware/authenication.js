module.exports.authenToken = (req, res, next) => {
  const db = require("../db");
  const data = db.get("phone");
  if (!req.signedCookies.access_token) {
    return res.redirect("/login");
  }
  const user = data.find({ id: req.signedCookies.access_token }).value();
  if (!user) {
    return res.redirect("/login");
  }
  res.locals.user = user;
  next();
};
