const shortid = require("shortid");
// config low db
const db = require("../db");
const products = db.get("product").value().slice(0, 6);
module.exports.getProducts = (req, res, nex) => {
  return res.render("products/products", {
    products: products,
  });
};
