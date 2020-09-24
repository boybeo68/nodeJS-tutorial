const db = require("../db");
const data = db.get("phone").value();
module.exports.getUsers = (req, res) => {
  res.render("users/users", {
    users: data.reverse(),
  });
};
