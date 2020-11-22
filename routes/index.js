const express = require("express");
const router = express.Router();

// TODO: rutas

router.use("/user", require("../Api/user/userRoutes"));
router.use("/auth", require("../Api/auth/authRoutes"))

module.exports = router;
