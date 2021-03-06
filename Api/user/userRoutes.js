const express = require("express");
const router = express.Router();
const userController = require("./userController");
// librerias
const { check } = require("express-validator");

// TODO: Endpoints

router.post(
  "/",
  [
    check("name", "Nombre es obligatorio").notEmpty(),
    check("email", "Email es obligatorio").notEmpty().isEmail(),
    check("password", "Password debe tener al menos 6 caracteres")
      .notEmpty()
      .isLength({ min: 8 }),
    check("username", "Nombre del usuario es obligatorio").notEmpty(),
  ],
  userController.createUser
);

module.exports = router;
