const DELIVERY_TYPES = {
  Kurier: {
    price: 14.99,
    name: "Kurier",
    photo: "courier.png",
  },
  "Poczta Polska": {
    price: 12.99,
    name: "Poczta Polska",
    photo: "post.png",
  },
  Paczkomat: {
    price: 9.99,
    name: "Paczkomat",
    photo: "inpost.png",
  },
};

const paymentWithDelivery = 5;

module.exports = { DELIVERY_TYPES, paymentWithDelivery };
