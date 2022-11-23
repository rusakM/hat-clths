const express = require("express");

const errorHandler = require("./controllers/errorController");
const taskRouter = require("./routes/taskRoutes");

const app = express();

app.use(
  express.json({
    limit: "10kb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  })
);

// 2) ROUTES

app.use("/tasks", taskRouter);

app.use(errorHandler);

module.exports = app;
