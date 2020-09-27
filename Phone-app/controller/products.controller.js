const shortid = require("shortid");
// config low db
const db = require("../db");
const products = db.get("product").value();
module.exports.getProducts = (req, res, nex) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 8;
  const start = (page - 1) * perPage;
  const end = page * perPage;
  const totalPage = Math.round(products.length / perPage);
  return res.render("products/products", {
    products: products.slice(start, end),
    totalPage: totalPage,
  });
};
module.exports.addToCart = (req, res, next) => {
  let productId = req.params.productId;
  productId = "product" + productId;
  console.log(productId);
  const sessionId = req.signedCookies.sessionId;
  if (!sessionId) {
    return res.redirect("/products");
  }
  let count = db
    .get("sessions")
    .find({ id: sessionId })
    .get(`cart[${productId}]`, 0)
    .value();

  db.get("sessions")
    .find({ id: sessionId })
    .set(`cart[${productId}]`, count + 1)
    .write();
  return res.redirect("/products");
};
