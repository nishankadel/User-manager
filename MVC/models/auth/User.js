const mongoose = require("mongoose");

const myFields = {
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
};

const userSchema = new mongoose.Schema(myFields);

const User = mongoose.model("User", userSchema);

module.exports = User;
