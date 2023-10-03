const express = require("express");
const userCtrl = require("../controllers/userCtrl");

const userRouter = express.Router();

userRouter.route("/").get(userCtrl.getAllUsers).delete(userCtrl.deleteAllUsers);

userRouter
  .route("/:id")
  .get(userCtrl.getOneUser)
  .patch(userCtrl.updateOneUser)
  .delete(userCtrl.deleteOneUser);

userRouter.route("/login").post(userCtrl.checkBody, userCtrl.login); // get one user
userRouter.route("/register").post(userCtrl.checkBody, userCtrl.register); // add new user

module.exports = userRouter;
