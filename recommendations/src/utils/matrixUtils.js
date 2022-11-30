const arraysUtils = require("./arraysUtils");

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
  shows
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

  productsList = this.calculateUsersRankForProduct(
    productsList,
    shows,
    boughts
  );

  return productsList;
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

exports.calculateUsersRankForProduct = (dataset, shows, boughts) => {
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
      usersObj[user] += 0.7;
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
      usersObj[user] /= 1.7;
      arr.push({ user, score: usersObj[user] });
    }

    arr = arr.sort((a, b) => b.score - a.score);

    dataset[item].usersList = arr;
  }
  return dataset;
};

exports.calculateTopSimilarProducts = (dataset) => {
  for (let item in dataset) {
  }
};
