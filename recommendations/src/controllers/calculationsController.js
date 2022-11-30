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
  const categoriesSet = uniqueSet.createSet(
    arrays.products.map(({ id }) => id)
  );

  const boughtsMatrix = matrixUtils.createBoughtsMatrix(
    usersSet,
    productsSet,
    arrays.boughts
  );

  const showsMatrix = matrixUtils.createShowsMatrix(
    usersSet,
    productsSet,
    arrays.productShows
  );

  const categoriesMatrix = matrixUtils.createCategoriesShowsMatrix(
    usersSet,
    categoriesSet,
    arrays.categoryShows
  );

  const usersMatrix = matrixUtils.createUsersMatrix(usersSet);
  for (let user1 of usersSet) {
    for (let user2 of usersSet) {
      if (user1 === user2) {
        usersMatrix[user1][user2] = 0;
      } else {
        const boughtsSimilarity = matrixUtils.cosineSimilarity(
          boughtsMatrix[user1],
          boughtsMatrix[user2]
        );

        const showsSimilarity =
          matrixUtils.cosineSimilarity(showsMatrix[user1], showsMatrix[user2]) *
          0.7;

        const categoriesSimilarity =
          matrixUtils.cosineSimilarity(
            categoriesMatrix[user1],
            categoriesMatrix[user2]
          ) * 0.3;

        usersMatrix[user1][user2] =
          (boughtsSimilarity + showsSimilarity + categoriesSimilarity) / 2;
      }
    }
  }

  const productDetailsList = matrixUtils.createProductsDetailsList(
    productsSet,
    arrays.products,
    arrays.boughts,
    arrays.productShows
  );

  const categoriesDetailsList = matrixUtils.createCategoriesRank(
    arrays.categories,
    arrays.boughts,
    arrays.categoryShows
  );

  // Colaborative filtering

  console.log("calc time: ", Date.now() - arrays.time, "ms");
  return {
    usersMatrix,
    productDetailsList,
    categoriesDetailsList,
    boughtsMatrix,
  };
};

const fetchArrays = async () => {
  try {
    const token = await utilsController.getToken();
    if (!token) {
      throw "No token";
    }
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

    const productShows = await superagent
      .get(`${process.env.API}/api/products/shows?limit=999999`)
      .set("Authorization", `Bearer ${token}`);

    const categoryShows = await superagent
      .get(`${process.env.API}/api/categories/shows?limit=999999`)
      .set("Authorization", `Bearer ${token}`);

    return {
      users: users._body.data.data,
      boughts: boughts._body.data.data,
      products: products._body.data.data,
      categories: categories._body.data.data,
      productShows: productShows._body.data.data,
      categoryShows: categoryShows._body.data.data,
      time: Date.now(),
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
