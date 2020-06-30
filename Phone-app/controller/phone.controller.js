const shortid = require("shortid");
// config low db
const db = require("../db");
const data = db.get("phone");
module.exports.index = (req, res) => res.json(data.value());

module.exports.info = (req, res) => {
  res.render("index", {
    title: "Hey",
    message: `Phone book has info ${data.value().length} people`,
    date: new Date(),
  });
};

module.exports.person = (req, res) => {
  const id = req.params.id;
  const phone = data.value().find((item) => {
    return item.id === id;
  });
  if (!phone) {
    return res.status(404).render("phones/notFound", { title: "NotFound" });
  }
  return res.json(phone);
};

module.exports.deletePerson = (req, res) => {
  const id = req.params.id;

  const newData = data.value().filter((item) => {
    return item.id !== id;
  });
  db.set("phone", newData).write();
  res.status(204).end();
};

module.exports.postPerson = (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number is require",
    });
  }
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
