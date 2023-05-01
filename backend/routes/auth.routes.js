const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();
const authController = require("../controller/auth.controller");

const { AuthModel } = require("../model/auth.model");

authRouter.post("/register", authController.register);

authRouter.post("/login", authController.login);

module.exports = { authRouter };
