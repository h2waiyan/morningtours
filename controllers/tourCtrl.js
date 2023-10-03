const Tour = require("../models/tourModel");

exports.getAllTours = async (req, res) => {
  const tours = await Tour.find();

  res.status(200).json({
    status: "success",
    tours,
  });
};

exports.getOneTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.tourid);

    res.status(200).json({
      status: "success",
      tour: tour,
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: "Something went wrong",
      error: err,
    });
  }
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

exports.updateOneTour = async (req, res) => {
  try {
    const newTour = await Tour.findByIdAndUpdate(req.params.tourid, req.body, {
      new: true,
    });

    res.status(200).json({
      status: "success",
      message: "Tour has been updated successfully.",
      tour: newTour,
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: "Something went wrong",
      error: err,
    });
  }
};

exports.deleteOneTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.tourid);
    res.status(204).json({
      status: "success",
      message: "Tour has been deleted successfully.",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Error while deleting tour",
    });
  }
};

exports.deleteAllTours = (req, res) => {
  try {
  } catch (err) {}
};

exports.checkID = (req, res, next, val) => {
  if (req.params.tourid * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  next();
};
