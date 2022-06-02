const express = require("express");
const invoiceController = require("../controllers/invoiceControler");

const router = express.Router();

router
  .route("/")
  .get(invoiceController.getInvoices)
  .post(invoiceController.fillAddress, invoiceController.createInvoice);

router
  .route("/:id")
  .get(invoiceController.fillAddress, invoiceController.getInvoice)
  .patch(invoiceController.updateInvoice)
  .delete(invoiceController.deleteInvoice);

module.exports = router;
