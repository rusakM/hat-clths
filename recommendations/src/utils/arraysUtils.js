exports.objArraysSimilarity = (arr1, arr2, field) => {
  if (arr1.length === 0 || arr2.length === 0) {
    return 0;
  }

  let score = 0;

  for (let item of arr1) {
    const filtered = arr2.filter((i) => i[field] === item);

    if (filtered.length > 0) {
      score++;
    }
  }
  return score;
};
