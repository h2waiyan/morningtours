const express = require("express");
const tourRouter = require("./routers/tourRoute");
const userRouter = require("./routers/userRoute");
const logger = require("./middlewares/logger");
const reqtime = require("./middlewares/reqTime");

const app = express();

// console.log(app.get("env")); // express env
// node env
console.log(process.env.NODE_ENV);

app.use(express.json()); // write head POST > ContentType: application/json
app.use(logger);
app.use(reqtime);

app.get("/", (req, res) => {
  res.end({ message: "Hello from Severs" });
});
// Mounting the Router
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
