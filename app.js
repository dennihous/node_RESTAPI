const express = require('express');
const app = express();
const port = process.env.PORT || 8800;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require("./routes/users");
const authRoute = require("./routes/authenticate");
const postRoute = require("./routes/posts");
const multer = require("multer");
const path = require("path");

dotenv.config()

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true}, (err) => {
  if (err) {
    console.log('MONGO ERROR')
    throw new Error(err)
  }
  console.log("Connected to MONGO")
})

app.use("/images", express.static(path.join(__dirname, "public/images")))

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
  try{
    return res.status(200).json("File uploaded successfully")
  }catch(err){
    console.log(err)
  }
})

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.get("/", (req, res) => {
  res.send("Welcome to homepage")
})

app.get("/users", (req, res) => {
  res.send("Welcome to users page")
})

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}!`)
})