import express from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import path from "path";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

//import errorHandler from "./controllers/errorController";

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
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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

//app.use(errorHandler);

export default app;
