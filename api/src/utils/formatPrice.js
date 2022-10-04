const formatPrice = (price) =>
  new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(price);

module.exports = formatPrice;
