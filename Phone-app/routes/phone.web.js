var express = require("express");
var router = express.Router();
const db = require("../db");
const data = db.get("phone");

const controller = require("../controller/phone.web.controller");
router.get("/create/person", controller.postPerson);

module.exports = router