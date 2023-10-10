const express = require("express");
const tourCtrl = require("../controllers/tourCtrl");

const tourRouter = express.Router();

tourRouter
  .route("/")
  .get(tourCtrl.getAllTours)
  .delete(tourCtrl.deleteAllTours)
  .post(tourCtrl.addNewTour);

tourRouter
  .route("/top-5-cheap")
  .get(tourCtrl.aliasTopTours, tourCtrl.getAllTours);

tourRouter
  .route("/:tourid")
  .get(tourCtrl.getOneTour)
  .patch(tourCtrl.updateOneTour)
  .delete(tourCtrl.deleteOneTour);

// tourRouter.param("tourid", tourCtrl.checkID);

module.exports = tourRouter;
