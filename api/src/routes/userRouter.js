const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const addressRouter = require("./addressRouter");
const invoiceRouter = require("./invoiceRouter");
const couponRouter = require("./couponRouter");

const router = express.Router();

//for everyone
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/googleLogin", authController.googleLogin);
router.get("/logout", authController.logout);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.post("/loginAdmin", authController.loginAdmin);

router.use(authController.protect);

// for users

router.patch("/updateMyPassword", authController.updatePassword);

router
  .route("/me")
  .get(authController.signUser, userController.getMe)
  .patch(userController.updateMe)
  .delete(userController.deleteMe);

router.use("/addresses", addressRouter);

router.use("/invoices", invoiceRouter);

router.use("/coupons", couponRouter);

router.use(authController.restrictTo("admin"));

// for admin

router.route("/").get(userController.getAllUsers);

router.get("/findByName/:name", userController.findUsers);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
