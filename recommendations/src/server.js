const dotenv = require("dotenv");
const app = require("./app");
const Queue = require("./utils/queue");
const runners = require("./jobs/runners");

dotenv.config();

process.on("uncaughtException", (err) => {
  console.log("Uncaught exception! Shutting down...");
  process.exit(1);
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App is running on ${port}...`);
});

global.immediateTasks = new Queue();
runners.immediateTasksRunner.running();

runners.dailyRecommendations.running();

process.on("unhandledRejection", (err) => {
  console.log("Unhandled rejection. Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down...");
  server.close(() => {
    console.log("Process terminated");
  });
});
