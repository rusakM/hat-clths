export const getElementIdInArray = (list, id) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i]._id === id) {
      return i;
    }
  }
};
