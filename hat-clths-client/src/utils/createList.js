const createList = (length = 4) => {
  const list = [];

  for (let i = 0; i < length; i++) {
    list.push(i);
  }

  return list;
};

export default createList;
