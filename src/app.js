"use strict";
require('dotenv').config();

// 3rd Party Resources
const express = require("express");
const cors = require("cors");
const {db} = require("./models/index");
const router = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.status(200).send("Hello 👋🌎 - 🖥 server");
});

app.use("/", router);


const port = process.env.PORT || 4010;
const server = app.listen(port, () => {
  if (!port) { throw new Error('Missing Port') }
  else { 
    console.log(`🌎🌎🌎🌎  ==> API Server now listening on PORT ${port}!`) };
});


db.sync()
  .then(() => {
    console.log("DataBase Connected ...");
    // prepare the date format
    let date = new Date().toLocaleString();
    date = date.split("/")[1] + "/" + date.split("/")[0] + "/" + date.split("/")[2];
    console.log(date);
  })
  .catch(console.error);

module.exports = {
  server: app,
};