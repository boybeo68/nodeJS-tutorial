module.exports.postPerson = (req, res, next) => {
  const body = req.body;
  var error = [];
  if (!body.name) {
    error.push("name is require");
  }
  if (!body.number) {
    error.push("number is require");
  }
  if (error.length) {
    console.log(error);
    return res.render("phones/createPhone", {
      error: error,
      name: body.name ? body.name : '',
      number: body.number ? body.number: ''
    });
  }
  next();
};
