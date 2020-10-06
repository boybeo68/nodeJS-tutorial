const mongoose = require("mongoose");

// ES6 Promises
mongoose.Promise = global.Promise;

// Connect to mongodb
before(function (done) {
  mongoose.connect('mongodb+srv://tung2:t1vo37a4fv0psqQC@cluster0.fby82.mongodb.net/firstdb?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

  mongoose.connection
    .once("open", function () {
      console.log("Ket noi da duoc thuc hien!");
      done();
    })
    .on("error", function (error) {
      console.log("Ket noi bi loi, ", error);
    });
});
