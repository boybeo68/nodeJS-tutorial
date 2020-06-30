var express = require("express");
var router = express.Router();
const db = require("../db");
const data = db.get("phone");
// config low db
const controller = require("../controller/phone.controller");
db.defaults({ phone: [] }).write();
router.get("/", (req, res) => res.json(data));
router.get("/api/person", controller.index);
router.get("/info", controller.info);
router.get("/api/person/:id", controller.person);
router.delete("/api/person/:id", controller.deletePerson);

router.post("/api/person", controller.postPerson);

module.exports = router;
