const express = require("express");
const formRouter = express.Router();

const { FormModel } = require("../model/form.model");
const formController = require("../controller/form.controller");

formRouter.get("/", formController.getAll);

formRouter.get("/:id", formController.getOne);

formRouter.post("/", formController.post);

module.exports = { formRouter };
