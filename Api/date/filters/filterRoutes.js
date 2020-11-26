const express = require("express");
const router = express.Router();
const filterController = require("./filterController");
const authMiddleware = require("../../../middlewares/authMiddleware");

// filtros
router.get(
  "/category/:category",
  authMiddleware,
  filterController.getDateByCategory
);
// marca una cita como favorita
router.post("/likes/:id", authMiddleware, filterController.handleLikes);
// eliminar cita favorita
router.delete("/likes/:id", authMiddleware, filterController.deleteLikes);
// retorna todas las citas favoritas
router.get("/likes", authMiddleware, filterController.getDatesByLikes);

module.exports = router;
