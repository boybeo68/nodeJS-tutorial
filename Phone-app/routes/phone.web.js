var express = require("express");
var router = express.Router();
const validate = require("../middleware/validate");
const controller = require("../controller/phone.web.controller");
const multer = require("multer");
var upload = multer({ dest: "./public/uploads" });
router.get("/create/person", controller.getPerson);
router.get("/cookie", controller.sendCookie);
router.post(
  "/create/person",
  upload.single("avatar"),
  validate.postPerson,
  controller.postPerson
);

module.exports = router;
