const express = require("express");
var morgan = require("morgan");
const shortid = require("shortid");
var fs = require("fs");
var path = require("path");
const app = express();
app.use(express.json());
app.set("view engine", "pug");
app.set("views", "./views");
// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// app.use(morgan('combined', { stream: accessLogStream }))

app.use(morgan(" :method :url :date[iso] - :body"));
morgan.token("body", (req, res) => JSON.stringify(req.body));
const port = 3000;
// config low db
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
db.defaults({ phone: [] }).write();
const data = db.get("phone");

// middleware
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
// app.use(requestLogger);
app.get("/", (req, res) => res.json(data));
app.get("/api/person", (req, res) => res.json(data.value()));
app.get("/info", (req, res) => {
  res.render("index", {
    title: "Hey",
    message: `Phone book has info ${data.value().length} people`,
    date: new Date(),
  });
});
app.get("/api/person/:id", (req, res) => {
  const id = req.params.id;
  const phone = data.value().find((item) => {
    return item.id === id;
  });
  if (!phone) {
    return res.status(404).json({ error: "Not found" });
  }
  return res.json(phone);
});
app.delete("/api/person/:id", (req, res) => {
  const id = req.params.id;

  const newData = data.value().filter((item) => {
    return item.id !== id;
  });
  db.set("phone", newData).write();
  res.status(204).end();
});

app.post("/api/person", (req, res) => {
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
});

// app.use(unknownEndpoint)

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
