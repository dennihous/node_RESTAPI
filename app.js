const express = require('express');
const app = express();
const port = process.env.PORT || 8800;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")

dotenv.config()

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true}, () => {
  console.log("Connected to MONGO")
})

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);


app.get("/", (req, res) => {
  res.send("Welcome to homepage")
})

app.get("/users", (req, res) => {
  res.send("Welcome to users page")
})

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}!`)
})