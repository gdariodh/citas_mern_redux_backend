const express = require("express");
const router = express.Router();
// controllers
const authController = require("./authController");
// middleware
const dataMiddleware = require("../../middlewares/dataMiddleware")
const authMiddleware = require("../../middlewares/authMiddleware")
// librerias
const { check } = require("express-validator");

// Usuario inicia sesion
router.post("/",dataMiddleware, authController.userAuth,);
// Retorna el token del inicio de sesion del usuario
router.get('/', authMiddleware, authController.authUser)

module.exports = router;
