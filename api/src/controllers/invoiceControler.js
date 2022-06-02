const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");
const Invoice = require("../models/invoiceModel");
const Address = require("../models/addressModel");

exports.createInvoice = factory.createOne(Invoice);
exports.getInvoice = factory.getOne(Invoice);
exports.updateInvoice = factory.updateOne(Invoice);
exports.deleteInvoice = factory.deleteOne(Invoice);

exports.getInvoices = catchAsync(async (req, res, next) => {
  const invoices = await Invoice.find({ address: req.params.address });

  if (!invoices) {
    return next(new AppError("Brak danych", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: invoices,
    },
  });
});

exports.fillAddress = catchAsync(async (req, res, next) => {
  if (!req.params.address && !req.body.address) {
    return next(new AppError("Nie podano adresu", 404));
  }

  let addressId;

  if (req.params.address) {
    addressId = req.params.address;
    req.body.address = req.params.address;
  } else {
    addressId = req.body.address;
  }

  const address = await Address.findById(addressId);

  if (!address) {
    return next(new AppError("Podano nieprawidłowy adres do faktury", 404));
  }

  next();
});
