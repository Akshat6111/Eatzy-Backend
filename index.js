const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./Routes/user")
const displayRoute = require("./Routes/displayData");
const orderRoute = require("./Routes/orderData")
const cors = require("cors");
require("dotenv").config();
const { mongooseConnect } = require("./connection");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/",userRoute);
app.use("/api/",displayRoute);
app.use("/api/",orderRoute);

mongooseConnect();




app.listen(PORT, ()=> console.log(`Server Started At ${PORT}`));