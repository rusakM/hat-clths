const express = require("express");
const addressController = require("../controllers/addressController");
const authCotroller = require("../controllers/authController");

const router = express.Router();

router.use(authCotroller.signUser);

router
  .route("/")
  .get(addressController.getUserAddress)
  .post(addressController.tryToSetAsDefault, addressController.createAddress);

router
  .route("/:id")
  .get(addressController.getAddress)
  .patch(addressController.tryToSetAsDefault, addressController.updateAddress)
  .delete(addressController.deleteAddress);

module.exports = router;
