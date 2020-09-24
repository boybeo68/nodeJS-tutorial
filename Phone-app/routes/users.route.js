var express = require("express");
var router = express();
const controller = require("../controller/users.controller");
router.get("/", controller.getUsers);
module.exports = router;
