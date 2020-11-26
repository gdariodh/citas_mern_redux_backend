const express = require("express");
const router = express.Router();
// controllers
const authController = require("./authController");
// middleware
const dataMiddleware = require("../../middlewares/dataMiddleware");
const authMiddleware = require("../../middlewares/authMiddleware");
// librerias
const { check } = require("express-validator");

// Usuario inicia sesion - dataMiddleware se encarga de procesar el email o usuario ingresado.
router.post(
  "/",
  [check("data", "Ingresa un email o usuario valido").notEmpty()],
  [
    check("password", "El password debe tener al menos 8 caracteres")
      .notEmpty()
      .isLength({ min: 8 }),
  ],
  dataMiddleware,
  authController.userAuth
);
// Retorna el token del inicio de sesion del usuario
router.get("/", authMiddleware, authController.authUser);

module.exports = router;
