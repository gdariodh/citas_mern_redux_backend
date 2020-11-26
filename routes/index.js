const express = require("express");
const router = express.Router();

// TODO: rutas

router.use("/user", require("../Api/user/userRoutes"));
router.use("/auth", require("../Api/auth/authRoutes"))
router.use("/dates", require("../Api/date/dateRoutes"))
router.use("/dates-filter",require("../Api/date/filters/filterRoutes"))

module.exports = router;
