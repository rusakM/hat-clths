const cron = require("croner");
const programmedJobs = require("./programmed.jobs");
const jobs = require("./onDemand.jobs");

exports.immediateTasksRunner = cron(
  "*/2 * * * * *",
  programmedJobs.immediateTasks
);

exports.dailyRecommendations = cron("1 1 * * *", jobs.callRecommendations);
