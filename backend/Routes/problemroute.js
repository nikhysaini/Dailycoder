const express = require('express');
const problemRouter =  express.Router();
const adminMiddleware = require("../Middleware/adminMiddleware")
const usermiddleware = require("../Middleware/authmiddleware")
const {createProblem,updateProblem,deleteProblem,getProblemById,getAllProblem,solvedAllProblembyUser} = require("../Controller/problem")


// admin
problemRouter.post("/create",adminMiddleware ,createProblem);
problemRouter.put("/update/:id",adminMiddleware, updateProblem);
problemRouter.delete("/delete/:id",deleteProblem);


problemRouter.get("/problemById/:id",getProblemById);
problemRouter.get("/getAllProblem", getAllProblem);
problemRouter.get("/problemSolvedByUser",usermiddleware,solvedAllProblembyUser);

module.exports = problemRouter;