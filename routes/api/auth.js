const express = require("express");
const registrationController = require("../../controllers/registrationController");
const loginController = require("../../controllers/loginController");
const emailverificationotpmatchController = require("../../controllers/emailverificationotpmatchController");
const _ = express.Router();



_.post("/registration", registrationController)
_.post("/login", loginController)
_.post("/emailverificationotpmatch", emailverificationotpmatchController)



module.exports = _;