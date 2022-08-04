const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) {
    return 0;
  }
  console.log(reviews);
  const sum = reviews
    .map(({ rating }) => rating)
    .reduce((total, val) => total + val);

  return sum / reviews.length;
};

export default calculateAverageRating;
