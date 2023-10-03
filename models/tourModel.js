const mongoose = require("mongoose");

tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name."],
    unique: true,
  },
  price: Number,
  duration: Number,
});

const Tour = mongoose.model("mytours", tourSchema); // MODEL

module.exports = Tour;
