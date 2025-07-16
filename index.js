const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./Routes/user");
const displayRoute = require("./Routes/displayData");
const orderRoute = require("./Routes/orderData");
const cors = require("cors");
require("dotenv").config();
const { mongooseConnect } = require("./connection");

const app = express();
const PORT = process.env.PORT || 8000;

const allowedOrigins = process.env.FRONTEND_ORIGIN.split(",");

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/", userRoute);
app.use("/api/", displayRoute);
app.use("/api/", orderRoute);


mongooseConnect();


app.listen(PORT, () => console.log(`🚀 Server Started At http://localhost:${PORT}`));
