require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const connectDB = require("./config/connectDB");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");

const { POST = 5000 } = process.env;

connectDB();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/auth", require("./routes/authRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/products", require("./routes/productRoutes"));
app.use("/categories", require("./routes/categoryRoutes"));
app.use("/cart", require("./routes/cartRoutes"));
app.use("/saved", require("./routes/savedRoutes"));
app.use("/settings", require("./routes/setttingsRoutes"));
app.use("/orders", require("./routes/orderRoutes"));

mongoose.connection.once("open", () => {
  console.log("Connected with mongodb");
  app.listen(POST, () => {
    console.log("Server run on Post", POST);
  });
});

mongoose.connection.on("error", (err) => {
  console.log("Error", err);
});
