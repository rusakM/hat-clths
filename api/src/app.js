const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const path = require("path");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");

const errorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRouter");
const categoryRouter = require("./routes/categoryRouter");
const productPreviewRouter = require("./routes/productPreviewRouter");
const bookingRouter = require("./routes/bookingRouter");
const emailTestRouter = require("./routes/emailTestRouter");

const app = express();

// 1) global middlewares

//use cors
app.use((req, res, next) => {
  next();
}, cors());

//use parameter pollution protection
app.use(hpp());

app.options(
  "*",
  (req, res, next) => {
    next();
  },
  cors()
);

//serving static files
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
console.log(process.cwd());
//development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//set security http headers
app.use(helmet());

//limit requests from the same ip
const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again later",
});
app.use("/api", limiter);

//body parser, reading data from body into req.body
app.use(
  express.json({
    limit: "10kb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  })
);
app.use(cookieParser());

// data sanitization against nosql query injection
app.use(mongoSanitize());

//data sanitization agains XSS
app.use(xss());

//use compression data
app.use(compression());

//add request time to req
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) ROUTES

app.get("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
  });
});

app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productPreviewRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/email-test", emailTestRouter);
app.use(errorHandler);

module.exports = app;
