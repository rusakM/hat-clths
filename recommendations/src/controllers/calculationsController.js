const axios = require("axios");
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

    const users = await axios({
      url: `${process.env.API}/api/users?limit=999999`,
      ...options,
    });

    const boughts = await axios({
      url: `${process.env.API}/api/bookings/boughts?limit=999999`,
      ...options,
    });

    const products = await axios({
      url: `${process.env.API}/api/products?limit=999`,
      ...options,
    });

    const categories = await axios({
      url: `${process.env.API}/api/categories`,
      ...options,
    });

    return {
      users: users.data.data.data,
      boughts: boughts.data.data.data,
      products: products.data.data.data,
      categories: categories.data.data.data,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
