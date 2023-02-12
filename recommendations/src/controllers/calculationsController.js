const superagent = require("superagent");
const utilsController = require("./utilsController");
const uniqueSet = require("../utils/uniqueSet");
const matrixUtils = require("../utils/matrixUtils");
const catchAsync = require("../utils/catchAsync");
const factorsList = require("../utils/factorsList");

exports.recommendations = catchAsync(async (req, res, next) => {
  const recommendations = await this.makeRecommendations();

  await this.sendRecommendations(recommendations, recommendations.token);

  res.status(200).json({
    data: {
      recommendations,
    },
  });
});

exports.makeRecommendations = async () => {
  // 1) get data

  const arrays = await fetchArrays();
  if (!arrays) {
    console.log("Arrays error");
    return null;
  }

  // 2) prepare datasets

  const usersSet = uniqueSet.createSet(arrays.users.map(({ id }) => id));
  const productsSet = uniqueSet.createSet(arrays.products.map(({ id }) => id));
  const categoriesSet = uniqueSet.createSet(
    arrays.products.map(({ id }) => id)
  );

  // 3) prepare pivot tables

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

  // Colaborative filtering

  // calculate user similarities
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
          factorsList.SHOW;

        const categoriesSimilarity =
          matrixUtils.cosineSimilarity(
            categoriesMatrix[user1],
            categoriesMatrix[user2]
          ) * factorsList.CATEGORIES_SIMILARITY;

        usersMatrix[user1][user2] =
          (boughtsSimilarity + showsSimilarity + categoriesSimilarity) /
          (factorsList.SHOW + factorsList.CATEGORIES_SIMILARITY);
      }
    }
  }

  // calculate product similarities
  const productDetailsList = matrixUtils.createProductsDetailsList(
    productsSet,
    arrays.products,
    arrays.boughts,
    arrays.productShows,
    arrays.categories,
    arrays.categoryShows,
    usersSet
  );

  // calculate categories rank

  // const categoriesDetailsList = matrixUtils.createCategoriesRank(
  //   arrays.categories,
  //   arrays.boughts,
  //   arrays.categoryShows
  // );

  // calculate user recommendations
  const usersRecommendations = matrixUtils.calculateUserRecommendations(
    usersSet,
    productsSet,
    usersMatrix,
    categoriesMatrix,
    productDetailsList,
    arrays.productShows,
    arrays.boughts,
    arrays.categoryShows
  );

  // modelling product recommendations
  const productRecommendations =
    matrixUtils.prepareProductRecommendations(productDetailsList);

  // modelling products rank

  const productsRank = matrixUtils.prepareProductsRank(productDetailsList);

  // modeling gender based top products

  const genderTopProducts = matrixUtils.prepareGenderTopProducts(productsRank);

  // modelling user products recommedations
  const userBasedRecommendations =
    matrixUtils.prepareUserProductRecommendations(
      usersRecommendations,
      productsRank,
      genderTopProducts,
      productDetailsList.usersPreferences
    );

  // modelling user preferences list
  const usersPreferences = matrixUtils.prepareUserPreferencesList(
    productDetailsList.usersPreferences
  );

  console.log("calculations time: ", Date.now() - arrays.time, "ms");

  return {
    productRecommendations,
    productsRank,
    genderTopProducts,
    userBasedRecommendations,
    token: arrays.token,
    usersPreferences,
  };
};

const fetchArrays = async () => {
  try {
    const token = await utilsController.getToken();
    if (!token) {
      throw "No token";
    }

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
      token,
      time: Date.now(),
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

exports.sendRecommendations = async (data, token) => {
  const {
    productRecommendations,
    userBasedRecommendations,
    productsRank,
    genderTopProducts,
    usersPreferences,
  } = data;
  // send recommendations to api
  try {
    //send product recommendations
    await superagent
      .post(`${process.env.API}/api/recommendations/cold`)
      .send({ recommendations: productRecommendations })
      .set("Authorization", `Bearer ${token}`);

    //send dedicated product recommendations
    await superagent
      .post(`${process.env.API}/api/recommendations/dedicated`)
      .send({ recommendations: userBasedRecommendations })
      .set("Authorization", `Bearer ${token}`);

    //send product rank
    await superagent
      .post(`${process.env.API}/api/recommendations/rank`)
      .send({ recommendations: productsRank })
      .set("Authorization", `Bearer ${token}`);

    //send gender recommendations
    await superagent
      .post(`${process.env.API}/api/recommendations/gender`)
      .send({ recommendations: genderTopProducts })
      .set("Authorization", `Bearer ${token}`);

    // send users recommendations profiles
    await superagent
      .post(`${process.env.API}/api/recommendations/user-profile`)
      .send({ recommendations: usersPreferences })
      .set("Authorization", `Bearer ${token}`);
  } catch (error) {
    throw "Recommendations send error";
  }
};
