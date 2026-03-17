const express = require('express');
const submitRouter = express.Router();
const userMiddleware = require("../Middleware/authmiddleware");
const {submitCode,RunCode} = require("../Controller/submit");

submitRouter.post("/submit/:id", userMiddleware, submitCode);
submitRouter.post("/run/:id", RunCode);

module.exports = submitRouter;