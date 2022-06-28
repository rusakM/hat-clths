const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");

exports.getMe = catchAsync(async (req, res, next) => {
  if (!req.user.id) {
    return next(new AppError("Nie można wykonać tej akcji", 404));
  }

  const me = await User.findById(req.user.id);

  if (!me) {
    return next(new AppError("Błąd pobierania danych", 404));
  }

  res.status(200).json({
    status: 200,
    data: {
      data: me,
    },
  });
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError("Aby zaktualizować hasło użyj /updateMyPassword", 400)
    );
  }

  const filteredBody = filterObj(req.body, "name", "surname", "email");

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      data: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

exports.findUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({ name: new RegExp(req.params.name, "gi") });
  if (!users) {
    return next(new AppError("Nie można wyszukać", 404));
  }
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      data: users,
    },
  });
});
