const calculationsController = require("../controllers/calculationsController");

exports.hello = function () {
  const d = new Date();
  console.log("task ok at: ", d.toTimeString());
};

exports.callRecommendations = async () => {
  console.log("Calculations start...");
  const recommendations = await calculationsController.makeRecommendations();

  await calculationsController.sendRecommendations(
    recommendations,
    recommendations.token
  );

  console.log("Calculations finished!");
};
