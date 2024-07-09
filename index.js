const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoute = require("./routesAndControllers/authenticationRoutes");
const productRoute = require("./routesAndControllers/productRoutes");
const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: false}));

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
  console.log("Connected Successfully");
})
.catch((error) => {
  console.log("Error:", error);
});



app.use("/auth", authRoute);
app.use("/product", productRoute);



app.listen(process.env.PORT, () => {
  console.log("Server is up");
});
