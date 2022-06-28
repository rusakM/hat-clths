const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");
const Invoice = require("../models/invoiceModel");
const Address = require("../models/addressModel");

exports.getInvoice = factory.getOne(Invoice);
exports.updateInvoice = factory.updateOne(Invoice);
exports.deleteInvoice = factory.deleteOne(Invoice);

exports.createInvoice = catchAsync(async (req, res, next) => {
  if (!req.body.address) {
    return next(new AppError("Nie podano adresu", 404));
  }

  let address = await Address.findById(req.body.address);

  if (!address) {
    return next(new AppError("Podany adres nie istenieje"));
  }

  address = address.toObject();

  if (address.user.id !== req.user.id) {
    return next(new AppError("Podany adres jest nieprawidłowy"));
  }

  const invoice = await Invoice.create(req.body);

  res.status(200).json({
    status: 200,
    data: {
      data: {
        invoice,
      },
    },
  });
});

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
