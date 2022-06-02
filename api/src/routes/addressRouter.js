const express = require("express");

const addressController = require("../controllers/addressController");
const authCotroller = require("../controllers/authController");
const invoiceRouter = require("./invoiceRouter");

const router = express.Router();

router.post(
  "/",
  authCotroller.signUser,
  addressController.tryToSetAsDefault,
  addressController.createAddress
);

router
  .route("/:id")
  .get(addressController.getAddress)
  .patch(addressController.tryToSetAsDefault, addressController.updateAddress)
  .delete(addressController.deleteAddress);

router.use("/:address/invoices", invoiceRouter);

module.exports = router;
