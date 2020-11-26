const express = require("express");
const router = express.Router();
const dateController = require("./dateController");
const authMiddleware = require("../../middlewares/authMiddleware");
const { check } = require("express-validator");

// crud
router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").notEmpty(),
    check("description", "Escribe una descripcion").notEmpty(),
    check("client", "Agrega un cliente").notEmpty(),
    check("hour", "Agrega la hora de la cita").notEmpty(),
    check("date", "Agrega una fecha a la cita").notEmpty(),
    check("category", "Elije una categoria").notEmpty(),
  ],
  authMiddleware,
  dateController.createDate
);
router.get("/", authMiddleware, dateController.getDates);
router.put(
  "/:id",
  [
    check("name", "El nombre es obligatorio").notEmpty(),
    check("description", "Escribe una descripcion").notEmpty(),
    check("client", "Agrega un cliente").notEmpty(),
    check("hour", "Agrega la hora de la cita").notEmpty(),
    check("date", "Agrega una fecha a la cita").notEmpty(),
    check("category", "Elije una categoria").notEmpty(),
  ],
  authMiddleware,
  dateController.editDate
);
router.delete("/:id", authMiddleware, dateController.deleteDate);

module.exports = router;
