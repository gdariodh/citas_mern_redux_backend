const express = require("express");
const app = express();
const routes = require("./routes");
const cors = require("cors");

// leer datos que pasan por el req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// permitir acceso a la api
app.use(cors());
// rutas generales
app.use("/api", routes);

module.exports = app;
