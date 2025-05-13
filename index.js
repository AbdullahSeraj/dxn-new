// morgan express-mongo-sanitize xss-clean express-validator
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const connectDB = require("./config/connectDB");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const globalError = require("./middleware/globalError");
const ApiError = require("./utils/apiError");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const { POST = 5000 } = process.env;

connectDB();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: "20kb" }));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(mongoSanitize());
app.use(xss());

app.use("/auth", require("./routes/authRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/products", require("./routes/productRoutes"));
app.use("/categories", require("./routes/categoryRoutes"));
app.use("/cart", require("./routes/cartRoutes"));
app.use("/saved", require("./routes/savedRoutes"));
app.use("/settings", require("./routes/setttingsRoutes"));
app.use("/orders", require("./routes/orderRoutes"));

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

app.use(globalError);

mongoose.connection.once("open", () => {
  console.log("Connected with mongodb");
  app.listen(POST, () => {
    console.log("Server run on Post", POST);
  });
});

mongoose.connection.on("error", (err) => {
  console.log("Error", err);
});
