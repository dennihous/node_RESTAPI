const express = require('express');
const app = express();
const port = process.env.PORT || 8800;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');


dotenv.config()

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true}, () => {
  console.log("Connected to MONGO")
})

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}!`)
})