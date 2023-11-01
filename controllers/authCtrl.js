const User = require("../models/userModel");
const APIFeatures = require("../utils/apifeatures");
const AppError = require("../utils/apperror");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = catchAsync(async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  res.status(201).json({
    status: "success",
    message: "User has been created successfully.",
    user,
    token,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const user = await User.findOne(req.body.email);

  if (!user) {
    return next(new AppError("User is not registered", 404));
  }

  const match = await bcrypt.compare(req.body.password, user.password);
  if (match == true) {
    let token;

    res.status(201).json({
      status: "success",
      message: "Logged in successfully.",
      token,
    });
  } else {
    return next(new AppError("Invalid Password", 401));
  }
});
