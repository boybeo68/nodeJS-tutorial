const shortid = require("shortid");
// config low db
const db = require("../db");
const data = db.get("phone");


module.exports.getPerson = (req, res) => {
  res.render("phones/createPhone", {
    message: "tung",
  });
};
module.exports.postPerson = (req, res) => {
  const body = req.body;
  const findName = data.find({ name: body.name }).value();
  if (findName) {
    return res.status(400).json({
      error: "The name already exists in the phonebook",
    });
  }
  const phone = {
    name: body.name,
    number: body.number,
    id: shortid.generate(),
  };
  data.push(phone).write();
  res.json(phone);
};
