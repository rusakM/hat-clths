const express = require("express");
const invoiceController = require("../controllers/invoiceControler");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.signUser);

router
  .route("/")
  .get(invoiceController.getInvoices)
  .post(invoiceController.createInvoice);

router
  .route("/:id")
  .get(invoiceController.getInvoice)
  .patch(invoiceController.updateInvoice)
  .delete(invoiceController.deleteInvoice);

module.exports = router;
