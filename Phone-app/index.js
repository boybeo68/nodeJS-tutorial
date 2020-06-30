const express = require("express");
var morgan = require("morgan");

var phone = require("./routes/phone.route");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use("/", phone);
app.use(express.static("public"));
app.use(morgan(" :method :url :date[iso] - :body"));

app.set("view engine", "pug");
app.set("views", "./views");
morgan.token("body", (req, res) => JSON.stringify(req.body));
const port = 3000;
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

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
