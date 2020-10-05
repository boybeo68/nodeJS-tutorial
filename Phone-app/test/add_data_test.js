const mocha = require("mocha");
const assert = require("assert");
const PersonChar = require("../models/person");

// Mieu ta lai qua trinh kiem tra
describe("Mieu ta them du lieu", function () {
  it("Them mot ban ghi vao co so du lieu", function (done) {
    var character = new PersonChar({
      name: "Tung new 2",
    });

    character.save().then(function () {
      assert(character.isNew === false);
      done();
    });
  });
});
