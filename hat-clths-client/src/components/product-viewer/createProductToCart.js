// {
// 	"productId": "sjkksldf",
//  "name": "spodnie roz M"
// 	"category": {
// 		"_id": "jkdsjfksd",
// 		"slug": "spodnie",
// 	},
// 	"price": 59,
// 	"productPreview": "ksdlfjlskdf",
// 	"imageCover": "default.webp"
// }

const createProductToCart = (productData, id) => {
  const productFromSize = productData.products.find(
    (product) => product._id === id
  );
  const product = {
    id,
    name: productFromSize.name,
    category: productData.category,
    price: productData.price,
    productPreview: productData._id,
    imageCover: productData.imageCover,
  };

  return product;
};

export default createProductToCart;
