const mongoose = require("mongoose");
const validator = require("validator");

//name, email, photo, password, passwordConfirm

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must have a name!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email."],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: 8,
    select: false,
  },
  passwordChangeAt: {
    type: Date,
    // default:
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
