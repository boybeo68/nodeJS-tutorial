const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema and Model

const PersonSchema = new Schema({
  name: String,
  height: Number,
  weight: Number,
  favoriteFoods: [String]
});

const PersonChar = mongoose.model("personchar", PersonSchema);

module.exports = PersonChar;
