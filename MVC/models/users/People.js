const mongoose = require("mongoose");

const peopleSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  address: String,
  phonenumber: Number,
  date: {
    type: Date,
    default: Date.now,
  },
  author: String,
});

const People = mongoose.model("People", peopleSchema);

module.exports = People;
