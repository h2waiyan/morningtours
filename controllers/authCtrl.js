const User = require("../models/userModel");
const APIFeatures = require("../utils/apifeatures");
const AppError = require("../utils/apperror");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

signToken = (userid) => {
  return jwt.sign(
    {
      id: userid,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

exports.register = catchAsync(async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  const token = signToken(user._id);

  res.status(201).json({
    status: "success",
    message: "User has been created successfully.",
    user,
    token,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );

  if (!user) {
    return next(new AppError("User is not registered", 404));
  }

  const match = await bcrypt.compare(req.body.password, user.password);

  if (match == true) {
    const token = signToken(user._id);

    res.status(201).json({
      status: "success",
      message: "Logged in successfully.",
      user,
      token,
    });
  } else {
    return next(new AppError("Invalid Password", 401));
  }
});

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  //   res.end("Hello");
  res.status(200).json({
    status: "success",
    users,
  });
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You have to login to view all tours.", 401));
  }

  // 2) Verification token
  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  console.log(decodedToken);

  // 3) Check if user still exists

  // 4) Check if user changed password after the token was issued

  // GRANT ACCESS TO PROTECTED ROUTE
  next();
});
