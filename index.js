
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const responseHelper = require("./middlewares/generate-response");
const errorHandler = require("./middlewares/error.handler");
var cron = require('node-cron');
const { UserModel } = require("./models/user");
require('dotenv').config();


const { connectDB } = require("./common/database");

const router = require("./api");

const port = 5000;
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
  methods: "GET,PUT,POST,DELETE,PATCH",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, constious SmartTVs) choke on 204
  credentials: true,
  allowedHeaders: "Content-Type, Authorization, Credentials"
};

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Allow CORS
app.use(cors(corsOptions));

app.use(errorHandler);

app.use(responseHelper);

// Initialize router
app.use("/api", router);

const bodyparser = require("body-parser");



app.get("/", function (req, res) {
  res.sendStatus(200);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});