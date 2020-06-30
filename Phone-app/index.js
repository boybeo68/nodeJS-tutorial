const express = require("express");
var morgan = require("morgan");
const app = express();
var phone = require("./routes/phone.route");
app.use(express.json());
app.set("view engine", "pug");
app.set("views", "./views");
const cors = require('cors')
app.use(morgan(" :method :url :date[iso] - :body"));
app.use("/", phone);
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
