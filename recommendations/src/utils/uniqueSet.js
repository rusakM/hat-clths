exports.createSet = (arr) => {
  let seen = {};
  let out = [];
  let j = 0;
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    if (seen[item] !== 1) {
      seen[item] = 1;
      out[j++] = item;
    }
  }
  return out;
};
