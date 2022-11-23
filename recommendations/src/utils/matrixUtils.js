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
