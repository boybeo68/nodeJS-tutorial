var express = require("express");
var router = express.Router();
const db = require("../db");
const data = db.get("phone");
const validate = require("../middleware/validate");

const controller = require("../controller/phone.web.controller");
router.get("/create/person", controller.getPerson);
router.get("/cookie", controller.sendCookie);
router.post("/create/person", validate.postPerson, controller.postPerson);

module.exports = router;
