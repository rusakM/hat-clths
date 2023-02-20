const superagent = require("superagent");
const utilsController = require("./utilsController");
const catchAsync = require("../utils/catchAsync");

exports.makeNewsletter = catchAsync(async (req, res, next) => {
  const newsletterInfo = await this.newsletter();

  res.status(200).json({
    status: "success",
    data: {
      data: newsletterInfo,
    },
  });
});

exports.newsletter = async () => {
  try {
    const token = await utilsController.getToken();
    if (!token) {
      throw "No token";
    }

    const newsletterInfo = await superagent
      .get(`${process.env.API}/api/newsletter/send-newsletter`)
      .set("Authorization", `Bearer ${token}`);

    return newsletterInfo;
  } catch (error) {
    console.log(error);
    return null;
  }
};
