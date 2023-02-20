const calculationsController = require("../controllers/calculationsController");
const newsletterController = require("../controllers/newsletterController");

exports.hello = function () {
  const d = new Date();
  console.log("task ok at: ", d.toTimeString());
};

exports.callRecommendations = async () => {
  console.log("Calculations start...");
  const time = Date.now();
  const recommendations = await calculationsController.makeRecommendations();

  await calculationsController.sendRecommendations(
    recommendations,
    recommendations.token
  );

  console.log(`Calculations finished! Total time: ${Date.now() - time}`);
};

exports.callNewsletter = async () => {
  console.log("Sending newsletter start...");
  const time = Date.now();
  await newsletterController.newsletter();

  console.log(
    `Sending newsletter finished! Total time: ${Date.now() - time}ms`
  );
};
