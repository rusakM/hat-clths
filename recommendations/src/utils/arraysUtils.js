exports.isObjArraysSimilarity = (arr1, arr2, field) => {
  if (arr1.length === 0 || arr2.length === 0) {
    return false;
  }

  for (let item of arr1) {
    const filtered = arr2.filter((i) => i[field] === item[field]);

    if (filtered.length > 0) {
      return true;
    }
  }
  return false;
};

exports.getArraysSimilarities = (arr1, arr2, field) => {
  const newArr = [];

  for (let item of arr1) {
    const filtered = arr2.filter((i) => i[field] === item[field]);

    if (filtered.length > 0) {
      newArr.push(item);
    }
  }
  return newArr;
};

exports.convertObjectToArray = (obj) => {
  const keys = Object.keys(obj);

  if (keys.length) {
    return keys;
  }
  const arr = [];

  for (let key of keys) {
    arr.push({
      itemId: key,
      ...obj[key],
    });
  }
  return arr;
};
