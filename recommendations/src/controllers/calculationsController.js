const superagent = require("superagent");
const utilsController = require("./utilsController");
const uniqueSet = require("../utils/uniqueSet");
const matrixUtils = require("../utils/matrixUtils");
const catchAsync = require("../utils/catchAsync");

exports.recommendations = catchAsync(async (req, res, next) => {
  const recommendations = await this.makeRecommendations();

  res.status(200).json({
    data: {
      recommendations,
    },
  });
});

exports.makeRecommendations = async () => {
  const arrays = await fetchArrays();
  if (!arrays) {
    console.log("Arrays error");
    return null;
  }

  const usersSet = uniqueSet.createSet(arrays.users.map(({ id }) => id));
  const productsSet = uniqueSet.createSet(arrays.products.map(({ id }) => id));

  const boughtsMatrix = matrixUtils.createBoughtsMatrix(
    usersSet,
    productsSet,
    arrays.boughts
  );

  const usersMatrix = matrixUtils.createUsersMatrix(usersSet);

  for (let user1 of usersSet) {
    for (let user2 of usersSet) {
      usersMatrix[user1][user2] = matrixUtils.cosineSimilarity(
        boughtsMatrix[user1],
        boughtsMatrix[user2]
      );
    }
  }

  return usersMatrix;
};

const fetchArrays = async () => {
  try {
    const token = await utilsController.getToken();
    if (!token) {
      throw "No token";
    }
    console.log(token);
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    };

    const users = await superagent
      .get(`${process.env.API}/api/users?limit=999999`)
      .set("Authorization", `Bearer ${token}`);

    const boughts = await superagent
      .get(`${process.env.API}/api/bookings/boughts?limit=999999`)
      .set("Authorization", `Bearer ${token}`);

    const products = await superagent
      .get(`${process.env.API}/api/products?limit=999`)
      .set("Authorization", `Bearer ${token}`);

    const categories = await superagent
      .get(`${process.env.API}/api/categories`)
      .set("Authorization", `Bearer ${token}`);

    return {
      users: users._body.data.data,
      boughts: boughts._body.data.data,
      products: products._body.data.data,
      categories: categories._body.data.data,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
