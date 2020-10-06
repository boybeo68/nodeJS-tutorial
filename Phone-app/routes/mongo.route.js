var express = require("express");
var router = express();
const controller = require("../controller/mongo.controller");
router.get("/", controller.person);
module.exports = router;
