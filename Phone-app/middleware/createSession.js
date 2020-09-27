const shortid = require("shortid");
const db = require("../db");
const data = db.get("sessions");
module.exports = (req, res, next) => {
  if (!req.signedCookies.sessionId) {
    const sessionId = shortid.generate();
    res.cookie("sessionId", sessionId, { signed: true });
    data.push({ id: sessionId }).write();
  }
  next();
};
