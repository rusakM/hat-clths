const initialArray = (arr = []) => {
  if (arr.length > 4) {
    return [0, 1, 2, 3];
  }

  return arr.map((i, index) => index);
};

export default initialArray;
