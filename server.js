const express = require("express");
const app = express();
const bodyParser = require('body-parser')
require("dotenv").config({ path: "./config/.env" });
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
const connectDb=require("./config/connectDb")
connectDb()
app.use(express.json())

const User=require("./routes/User.routes")
app.use("/",User)

const Email=require("./routes/Email.routes")
app.use("/",Email)

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`server is runing on http://localhost:${PORT}`)
);