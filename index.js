require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser')
const dbConnection = require("./config/dbConnection");
const cors = require("cors");
const route = require("./routes");

const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
// parse application/json
app.use(express.json())
app.use(cors());
app.use(route);

dbConnection();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(8000);
