const express = require("express");
const taskController = require("../controllers/taskController");
const onDemandJobs = require("../jobs/onDemand.jobs");
const calculationsController = require("../controllers/calculationsController");

const router = express.Router();

router.get(
  "/hello",
  taskController.addImmediateTask(onDemandJobs.hello),
  taskController.sendSuccessResponse
);

router.get("/recommendations", calculationsController.recommendations);

module.exports = router;
