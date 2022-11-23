const cron = require("croner");
const programmedJobs = require("./programmed.jobs");

exports.immediateTasksRunner = cron(
  "*/2 * * * * *",
  programmedJobs.immediateTasks
);
