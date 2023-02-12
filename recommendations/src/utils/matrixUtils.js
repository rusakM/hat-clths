const arraysUtils = require("./arraysUtils");
const factorsList = require("./factorsList");
const uniqueSet = require("./uniqueSet").createSet;

exports.createBoughtsMatrix = (usersSet, productsSet, boughts) => {
  const matrix = {};

  for (let user of usersSet) {
    matrix[user] = {};
    for (let product of productsSet) {
      matrix[user][product] = 0;
    }
  }

  for (let bought of boughts) {
    const { user, productPreview } = bought;
    matrix[user._id][productPreview._id] = 1;
  }

  return matrix;
};

exports.createShowsMatrix = (usersSet, productsSet, shows) => {
  const matrix = {};

  for (let user of usersSet) {
    matrix[user] = {};
    for (let product of productsSet) {
      matrix[user][product] = 0;
    }
  }

  for (let show of shows) {
    const { user, productPreview } = show;
    if (user) {
      matrix[user][productPreview] = 1;
    }
  }

  return matrix;
};

exports.createCategoriesShowsMatrix = (usersSet, categoriesSet, shows) => {
  const matrix = {};

  for (let user of usersSet) {
    matrix[user] = {};
    for (let category of categoriesSet) {
      matrix[user][category] = 0;
    }
  }

  for (let show of shows) {
    const { user, category } = show;
    if (user) {
      matrix[user][category] = 1;
    }
  }

  return matrix;
};

exports.createUsersMatrix = (usersSet) => {
  const matrix = {};

  for (let user1 of usersSet) {
    matrix[user1] = {};
    for (let user2 of usersSet) {
      matrix[user1][user2] = 0;
    }
  }

  return matrix;
};

exports.cosineSimilarity = (user1, user2) => {
  // ------------------
  // Excel formula for cosine similarity:

  //=SUMA.ILOCZYNÓW(C3:C22;D3:D22) /
  //(PIERWIASTEK(SUMA.KWADRATÓW(C3:C22)) *
  //PIERWIASTEK(SUMA.KWADRATÓW(D3:D22)))
  // ------------------
  //

  let sumProduct = 0;
  let sumSq1 = 0;
  let sumSq2 = 0;

  const productsSet = Object.keys(user1);

  for (let product of productsSet) {
    sumProduct += user1[product] * user2[product];
    sumSq1 += user1[product] * user1[product];
    sumSq2 += user2[product] * user2[product];
  }
  try {
    return sumProduct / (Math.sqrt(sumSq1) * Math.sqrt(sumSq2)) || 0;
  } catch (error) {
    return 0;
  }
};

exports.createProductsDetailsList = (
  productsSet,
  productsArr,
  boughts,
  shows,
  categories,
  categoriesShows,
  usersSet
) => {
  let productsList = {};

  for (let product of productsSet) {
    const productData = {
      soldItems: 0,
      name: "",
      id: product,
      productShows: 0,
      productBoughts: 0,
      category: {
        id: "",
        name: "",
      },
      gender: null,
      boughtsRank: 0,
      showsRank: 0,
      usersList: [],
      topSimilarProducts: [],
      ranksAverage: 0,
      rank: 0,
    };
    productsList[product] = productData;
  }

  for (let product of productsArr) {
    const { _id, name, category } = product;
    productsList[_id].name = name;
    productsList[_id].category = {
      name: category.name,
      id: category._id,
    };
    productsList[_id].gender = category.gender;
  }

  for (let bought of boughts) {
    const {
      quantity,
      productPreview: { _id },
    } = bought;
    productsList[_id].productBoughts++;
    productsList[_id].soldItems += quantity;
  }

  for (let show of shows) {
    const { productPreview } = show;
    productsList[productPreview].productShows++;
  }
  productsList = this.calculateRank(
    productsList,
    "boughtsRank",
    "productBoughts"
  );
  productsList = this.calculateRank(productsList, "showsRank", "productShows");

  for (let product in productsList) {
    const p = productsList[product];

    productsList[product].ranksAverage =
      (p.showsRank * factorsList.SHOW + p.boughtsRank * factorsList.BOUGHT) /
      (factorsList.BOUGHT + factorsList.SHOW);
  }

  productsList = this.calculateRank(productsList, "rank", "ranksAverage", true);

  const usersPreferences = this.calculateUsersPreferences(
    usersSet,
    shows,
    boughts,
    categories,
    categoriesShows,
    productsList
  );
  productsList = this.calculateUsersRankForProduct(
    productsList,
    shows,
    boughts,
    usersPreferences
  );

  productsList = this.calculateTopSimilarProducts(productsList);

  return {
    productsList,
    usersPreferences,
  };
};

exports.createCategoriesRank = (categories, boughts, shows) => {
  let dataset = {};

  for (let category of categories) {
    dataset[category._id] = {
      ...category,
      boughtsRank: 0,
      boughts: 0,
      showsRank: 0,
      shows: 0,
      ranksAverage: 0,
      rank: 0,
    };
  }

  for (let show of shows) {
    const { category } = show;
    dataset[category].shows++;
  }

  for (let bought of boughts) {
    const {
      category: { _id },
    } = bought;
    dataset[_id].boughts++;
  }

  dataset = this.calculateRank(dataset, "boughtsRank", "boughts");
  dataset = this.calculateRank(dataset, "showsRank", "shows");

  for (let category of categories) {
    const cat = dataset[category._id];
    dataset[category._id].ranksAverage =
      (cat.boughtsRank * factorsList.BOUGHT +
        cat.showsRank * factorsList.SHOW) /
      (factorsList.BOUGHT + factorsList.SHOW);
  }
  dataset = this.calculateRank(dataset, "rank", "ranksAverage");

  return dataset;
};

exports.calculateRank = (dataset, field, fieldSort, asc = false) => {
  const datasetArr = [];
  const nd = {};
  for (let item in dataset) {
    datasetArr.push(dataset[item]);
  }

  let sorted = [];
  if (asc) {
    sorted = datasetArr.sort((a, b) => a[fieldSort] - b[fieldSort]);
  } else {
    sorted = datasetArr.sort((a, b) => b[fieldSort] - a[fieldSort]);
  }

  for (let i = 0; i < sorted.length; i++) {
    const item = sorted[i];
    item[field] = i + 1;
    nd[item.id] = item;
  }

  return nd;
};

exports.calculateUsersRankForProduct = (
  dataset,
  shows,
  boughts,
  usersPreferences
) => {
  for (let item in dataset) {
    const itemsShows = shows.filter(
      (show) => show.productPreview === item && show.user
    );

    const itemBoughts = boughts.filter(
      (bought) => bought.productPreview._id === item && bought.user
    );

    const usersObj = {};

    for (let show of itemsShows) {
      const { user } = show;
      if (!usersObj[user]) {
        usersObj[user] = 0;
      }
      usersObj[user] += factorsList.SHOW;
    }

    for (let bought of itemBoughts) {
      const {
        user: { _id },
        quantity,
      } = bought;
      if (!usersObj[_id]) {
        usersObj[_id] = 0;
      }
      usersObj[_id] += quantity;
    }

    let arr = [];

    for (let user in usersObj) {
      usersObj[user] /= factorsList.SHOW + factorsList.BOUGHT;
      usersObj[user] = calculateGenderFactor(
        usersObj[user],
        usersPreferences[user],
        dataset[item].category.gender
      );
      arr.push({ user, score: usersObj[user] });
    }

    arr = arr.sort((a, b) => b.score - a.score);

    dataset[item].usersList = arr;
  }
  return dataset;
};

const calculateGenderFactor = (userScore, userPref, itemGender) => {
  let add = 0;
  if (itemGender) {
    add = userScore * userPref;
  } else {
    add = userScore * userPref * -1;
  }

  return userScore + add;
};

exports.calculateTopSimilarProducts = (dataset) => {
  for (let item in dataset) {
    const arr1 = dataset[item].usersList;
    let similarProducts = [];
    const category1 = dataset[item].category;
    let topCategoryProducts = [];

    if (arr1.length === 0) {
      dataset[item].topSimilarProducts = [];
      continue;
    }

    for (let item2 in dataset) {
      if (item === item2) {
        continue;
      }

      const arr2 = dataset[item2].usersList;
      let usersSimilarities = [];
      let productScore = 0;
      const category2 = dataset[item2].category;
      if (arraysUtils.isObjArraysSimilarity(arr1, arr2, "user")) {
        usersSimilarities = arraysUtils.getArraysSimilarities(
          arr1,
          arr2,
          "user"
        );
      }

      if (usersSimilarities.length > 0) {
        productScore =
          usersSimilarities
            .map(({ score }) => score)
            .reduce((total, val) => total + val) * factorsList.USER_SIMILARITY;
        productScore += dataset[item2].productShows / factorsList.SHOW;
        productScore += dataset[item2].productBoughts;
        productScore /=
          factorsList.USER_SIMILARITY + factorsList.BOUGHT + factorsList.SHOW;
        if (category1.gender === category2.gender) {
          productScore *= factorsList.GENDER_COMP;
        } else {
          productScore *= factorsList.GENGER_NOT_COMP;
        }
        if (category1.id === category2.id) {
          productScore *= factorsList.IDENTICAL_CATEGORY;
        }
        similarProducts.push({
          product: item2,
          score: productScore,
        });
      }

      if (category1.id === category2.id && item !== item2) {
        const { soldItems, productShows, productBoughts } = dataset[item2];
        topCategoryProducts.push({
          product: item2,
          score:
            (soldItems + productShows + productBoughts) /
            (factorsList.BOUGHT +
              factorsList.show +
              factorsList.CATEGORY_SHOW +
              factorsList.GENDER_COMP),
        });
      }
    }

    if (similarProducts.length > 0) {
      similarProducts = similarProducts.sort((a, b) => b.score - a.score);
      dataset[item].topSimilarProducts = similarProducts;
    } else {
      dataset[item].topSimilarProducts = topCategoryProducts.sort(
        (a, b) => a.score - b.score
      );
    }
  }

  return dataset;
};

exports.calculateUsersPreferences = (
  usersSet,
  shows,
  boughts,
  categories,
  categoriesShows,
  productsDataset
) => {
  const usersList = {};
  const categoriesList = {};

  for (let user of usersSet) {
    usersList[user] = 0;
  }

  for (let category of categories) {
    categoriesList[category._id] = category.gender;
  }
  for (let user in usersList) {
    let mensPt = 0;
    let womensPt = 0;

    const userBoughts = boughts.filter((item) => item.user.id === user);
    const userShows = shows.filter((item) => item.user === user);

    const userCategoryShows = categoriesShows.filter(
      (item) => item.user === user
    );

    if (
      userBoughts.length === 0 &&
      userShows.length === 0 &&
      userCategoryShows.legth === 0
    ) {
      usersList[user] = 0;
      continue;
    }

    for (let bought of userBoughts) {
      if (categoriesList[bought.category.id]) {
        mensPt += factorsList.BOUGHT;
      } else {
        womensPt += factorsList.BOUGHT;
      }
    }

    for (let show of userShows) {
      if (categoriesList[productsDataset[show.productPreview].category.id]) {
        mensPt += factorsList.SHOW;
      } else {
        womensPt += factorsList.SHOW;
      }
    }

    for (let categoryShow of userCategoryShows) {
      if (categoriesList[categoryShow.category]) {
        mensPt += factorsList.CATEGORY_SHOW;
      } else {
        womensPt += factorsList.CATEGORY_SHOW;
      }
    }

    if (mensPt === womensPt) {
      usersList[user] = 0;
    } else if (mensPt > womensPt) {
      usersList[user] = (mensPt - womensPt) / mensPt;
    } else {
      usersList[user] = ((womensPt - mensPt) / womensPt) * -1;
    }
  }

  return usersList;
};

exports.calculateUserRecommendations = (
  usersSet,
  productsSet,
  usersSimilaritiesList,
  categoriesMatrix,
  productsDataset,
  shows,
  boughts,
  categoriesShows
) => {
  //prepare users similarities
  const usersRecommendations = {};
  const INITIAL_PRODUCTS_SCORES = this.createProductsScores(productsSet);

  for (let user of usersSet) {
    usersRecommendations[user] = {
      id: user,
      recommendedProducts: [],
      recommendedCategories: [],
      topCategories: [],
      topProducts: [],
      topSimilarUsers: [],
      userProductsScores: {},
      productsExclusion: [],
    };

    for (let user2 of Object.keys(usersSimilaritiesList)) {
      if (usersSimilaritiesList[user][user2] > 0) {
        usersRecommendations[user].topSimilarUsers.push({
          itemId: user2,
          score: usersSimilaritiesList[user][user2],
        });
      }
    }

    usersRecommendations[user].topSimilarUsers.sort(
      (a, b) => b.score - a.score
    );

    usersRecommendations[user].topSimilarUsers =
      arraysUtils.convertArrayToObject(
        usersRecommendations[user].topSimilarUsers
      );

    const userCategoryShows = categoriesShows.filter(
      (item) => item.user === user
    );
    const userCategories = {};

    for (let categoryShow of userCategoryShows) {
      const { category } = categoryShow;
      if (userCategories[category]) {
        userCategories[category].score++;
      } else {
        userCategories[category] = {
          score: 1,
        };
      }
    }

    usersRecommendations[user].topCategories =
      arraysUtils.convertObjectToArray(userCategories);

    usersRecommendations[user].topCategories.sort((a, b) => b.score - a.score);

    usersRecommendations[user].userActions = getUserActionsSet(
      user,
      shows,
      boughts,
      categoriesShows
    );

    usersRecommendations[user].userActions.products =
      arraysUtils.convertArrayToObject(
        usersRecommendations[user].userActions.products
      );
    usersRecommendations[user].userActions.categories =
      arraysUtils.convertArrayToObject(
        usersRecommendations[user].userActions.categories
      );

    usersRecommendations[user].productsExclusion = uniqueSet(
      boughts
        .filter((item) => item.user._id === user)
        .map((item) => item.productPreview._id)
    );

    usersRecommendations[user].userProductsScores = {
      ...INITIAL_PRODUCTS_SCORES,
    };
  }

  for (let user1 of usersSet) {
    const recommendationsMegaList = {
      ...usersRecommendations[user1].userActions.products,
    };

    const userExclusions = [...usersRecommendations[user1].productsExclusion];

    for (let user2 of usersSet) {
      if (user1 === user2) {
        continue;
      }
      const actions = { ...usersRecommendations[user2].userActions.products };
      const similarUser = usersRecommendations[user1].topSimilarUsers[user2];
      const userSimilarity =
        similarUser && similarUser.score ? similarUser.score : 0;

      for (let product in actions) {
        if (!recommendationsMegaList[product]) {
          recommendationsMegaList[product] = { ...actions[product] };
          let score = actions[product].score;
          score *=
            userSimilarity +
            calculateProductFactor(
              product,
              productsDataset,
              usersRecommendations[user1].topCategories,
              usersRecommendations[user1].userActions
            );
          score = calculateGenderSimilarity(
            user1,
            product,
            score,
            productsDataset
          );
          recommendationsMegaList[product].score = score;
        } else {
          recommendationsMegaList[product].score +=
            actions[product].score * userSimilarity;
          recommendationsMegaList[product].score += calculateProductFactor(
            product,
            productsDataset,
            usersRecommendations[user1].topCategories,
            usersRecommendations[user1].userActions
          );
          recommendationsMegaList[product].score = calculateGenderSimilarity(
            user1,
            product,
            recommendationsMegaList[product].score,
            productsDataset
          );
        }
      }
    }

    for (let recommendation in recommendationsMegaList) {
      if (userExclusions.find((item) => item === recommendation)) {
        delete recommendationsMegaList[recommendation];
        continue;
      }
      if (
        recommendationsMegaList[recommendation].score === Infinity ||
        recommendationsMegaList[recommendation].score === -Infinity
      ) {
        delete recommendationsMegaList[recommendation];
        continue;
      }
      if (recommendationsMegaList[recommendation].score <= 0) {
        delete recommendationsMegaList[recommendation];
        continue;
      }
      recommendationsMegaList[recommendation].category =
        productsDataset.productsList[recommendation].category.id;
    }

    usersRecommendations[user1].userProductsScores = recommendationsMegaList;
  }

  return usersRecommendations;
};

const getUserActionsSet = (userId, shows, boughts, categoriesShows) => {
  const userActions = {
    products: {},
    categories: {},
  };

  const userBoughts = boughts.filter((item) => item.user.id === userId);
  const userShows = shows.filter((item) => item.user === userId);

  const userCategoryShows = categoriesShows.filter(
    (item) => item.user === userId
  );

  for (let bought of userBoughts) {
    const { productPreview } = bought;
    if (userActions.products[productPreview.id]) {
      userActions.products[productPreview.id].score += factorsList.BOUGHT;
    } else {
      userActions.products[productPreview.id] = { score: factorsList.BOUGHT };
    }
  }

  for (let show of userShows) {
    const { productPreview } = show;

    if (userActions.products[productPreview]) {
      userActions.products[productPreview].score += factorsList.SHOW;
    } else {
      userActions.products[productPreview] = { score: factorsList.SHOW };
    }
  }

  let multiplier = factorsList.BOUGHT;

  if (userBoughts.length && userShows.length) {
    multiplier += factorsList.SHOW;
  } else if (!userBoughts.length && userShows.length) {
    multiplier = factorsList.SHOW;
  }

  for (let categoryShow of userCategoryShows) {
    const category = `${categoryShow.category}`;
    if (userActions.categories[category]) {
      userActions.categories[category].score++;
    } else {
      userActions.categories[category] = { score: 1 };
    }
  }

  userActions.products = arraysUtils
    .convertObjectToArray(userActions.products)
    .map((item) => ({
      ...item,
      score: item.score / multiplier,
    }))
    .sort((a, b) => b.score - a.score);

  userActions.categories = arraysUtils
    .convertObjectToArray(userActions.categories)
    .sort((a, b) => b.score - a.score);

  return userActions;
};

exports.createProductsScores = (productsSet) => {
  const obj = {};

  for (let product of productsSet) {
    obj[product] = {
      total: 0,
      sumSimilarity: 0,
      score: 0,
    };
  }

  return obj;
};

const calculateProductFactor = (
  product,
  productsList,
  userCategoriesRank,
  userActions
) => {
  const productData = productsList.productsList[product];
  const category = productData.category.id;
  let score = 0;

  score += (1 / productData.ranksAverage) * factorsList.USER_SIMILARITY;

  if (userCategoriesRank[category]) {
    score +=
      (userCategoriesRank[category].score / 100) *
      factorsList.CATEGORIES_SIMILARITY;
  }

  if (userActions.products[product]) {
    score += userActions.products[product].score * factorsList.ACTION;
  }

  return score;
};

const calculateGenderSimilarity = (user, product, score, productsList) => {
  const productScore = productsList.productsList[product].gender ? 1 : -1;
  const userScore = productsList.usersPreferences[user];

  return score * (productScore / userScore);
};

exports.prepareProductRecommendations = (productsDataset) => {
  const productsRecommendationsList = [];
  const date = Date.now();

  for (let product in productsDataset.productsList) {
    const p = productsDataset.productsList[product];

    if (p.topSimilarProducts) {
      let topProductsCount = factorsList.TOP_PRODUCTS_COUNT;
      if (p.topSimilarProducts.length < topProductsCount) {
        topProductsCount = p.topSimilarProducts.length;
      }

      for (let i = 0; i < topProductsCount; i++) {
        productsRecommendationsList.push({
          productPreview: product,
          similarProduct: p.topSimilarProducts[i].product,
          predictionScore: p.topSimilarProducts[i].score,
          category: p.category.id,
          similarProductCategory:
            productsDataset.productsList[p.topSimilarProducts[i].product]
              .category.id,
          createdAt: date,
        });
      }
    }
  }

  return productsRecommendationsList;
};

exports.prepareProductsRank = (productsDataset) => {
  const createdAt = Date.now();
  const sortedProducts = arraysUtils
    .convertObjectToArray(productsDataset.productsList)
    .map(({ id, ranksAverage, gender, category }) => ({
      productPreview: id,
      ranksAverage,
      gender,
      createdAt,
      category: category.id,
    }))
    .sort((a, b) => a.ranksAverage - b.ranksAverage);

  return sortedProducts;
};

exports.prepareGenderTopProducts = (productsRank) => {
  const maleProducts = [];
  const femaleProducts = [];
  let i = 0;

  while (maleProducts.length < 20 || femaleProducts.length < 20) {
    if (i === productsRank.length) {
      break;
    }
    if (productsRank[i].gender) {
      if (maleProducts.length === 20) {
        i++;
        continue;
      }
      maleProducts.push(productsRank[i]);
    } else {
      if (femaleProducts.length === 20) {
        i++;
        continue;
      }
      femaleProducts.push(productsRank[i]);
    }
    i++;
  }
  return [...maleProducts, ...femaleProducts];
};

exports.prepareUserProductRecommendations = (
  usersRecommendations,
  productsRank,
  genderBasedRecommendations,
  usersGenderPreferences
) => {
  const productRecommendationsList = [];
  const createdAt = Date.now();
  const maleProducts = genderBasedRecommendations.filter(
    (item) => item.gender === true
  );
  const femaleProducts = genderBasedRecommendations.filter(
    (item) => item.gender === false
  );

  for (let user in usersRecommendations) {
    let recommendedProducts = usersRecommendations[user].userProductsScores;
    const keys = Object.keys(recommendedProducts);
    let otherProducts = 0;
    if (keys.length > 0) {
      if (keys.length < factorsList.USER_PRODUCTS_COUNT) {
        otherProducts = factorsList.USER_PRODUCTS_COUNT - keys.length;
      }
      recommendedProducts = arraysUtils
        .convertObjectToArray(recommendedProducts)
        .map((item) => ({
          productPreview: item.itemId,
          predictionScore: item.score,
          category: item.category,
          user,
          createdAt,
        }))
        .sort((a, b) => b.predictionScore - a.predictionScore);

      if (recommendedProducts.length > 20) {
        for (let i = 0; i < 20; i++) {
          productRecommendationsList.push(recommendedProducts[i]);
        }
        continue;
      } else {
        for (let i = 0; i < recommendedProducts.length; i++) {
          productRecommendationsList.push(recommendedProducts[i]);
        }
        // select top products by gender
        if (usersGenderPreferences[user] !== 0) {
          let j = otherProducts;
          let k = 0;
          const gender = usersGenderPreferences[user] > 0 ? true : false;
          while (j > 0) {
            if (gender) {
              productRecommendationsList.push({
                productPreview: maleProducts[k].productPreview,
                predictionScore: maleProducts[0].ranksAverage,
                category: maleProducts[k].category,
                user,
                createdAt,
              });
            } else {
              productRecommendationsList.push({
                productPreview: femaleProducts[k].productPreview,
                predictionScore: femaleProducts[0].ranksAverage,
                category: femaleProducts[k].category,
                user,
                createdAt,
              });
            }
            j--;
            k++;
          }
        } else {
          for (let i = 0; i < otherProducts; i++) {
            productRecommendationsList.push({
              productPreview: productsRank[i].productPreview,
              predictionScore: productsRank[i].ranksAverage,
              category: productsRank[i].category,
              user,
              createdAt,
            });
          }
        }
      }
    } else {
      for (let i = 0; i < 20; i++) {
        productRecommendationsList.push({
          productPreview: productsRank[i].productPreview,
          predictionScore: productsRank[i].ranksAverage,
          category: productsRank[i].category,
          user,
          createdAt,
        });
      }
    }
  }
  return productRecommendationsList;
};

exports.prepareUserPreferencesList = (usersPreferences) => {
  let usersArray = [];
  const createdAt = Date.now();

  for (let user in usersPreferences) {
    usersArray.push({
      user,
      score: usersPreferences[user],
      gender: usersPreferences[user] > 0 ? true : false,
      createdAt,
    });
  }

  return usersArray;
};
