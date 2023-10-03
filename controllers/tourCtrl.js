const Tour = require("../models/tourModel");

exports.getAllTours = async (req, res) => {
  // SELECT * FROM tours;
  //   res.end("Hello");

  const tours = await Tour.find();

  res.status(200).json({
    status: "success",
    tours,
  });
};

exports.getOneTour = async (req, res) => {
  const tour = await Tour.findById(req.params.tourid);

  res.status(200).json({
    status: "success",
    tour: tour,
  });
};

exports.addNewTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(200).json({
      status: "success",
      message: "Tour has been added successfully.",
      tour: newTour,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: "fail",
      message: `${err.message} ${err.name}`,
    });
  }
};

exports.updateOneTour = (req, res) => {
  var newTour = {
    ...tour,
    duration: req.body.duration,
  };

  res.status(200).json({
    status: "success",
    message: "Tour has been updated successfully.",
    tour: newTour,
  });
};

exports.deleteOneTour = (req, res) => {
  if (!tour) {
    return res.status(200).json({
      status: "fail",
      message: "Tour doesn't exist",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Tour has been deleted successfully.",
  });
};

exports.deleteAllTours = (req, res) => {};

exports.checkID = (req, res, next, val) => {
  if (req.params.tourid * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  next();
};
