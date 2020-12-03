const express = require("express");
const app = express();
const routes = require("./routes");
const cors = require("cors");

// leer datos que pasan por el req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// permitir acceso a la api
const configCors = {
  origin: process.env.FRONTEND_URL,
};
app.use(cors(configCors));
// rutas generales
app.use("/api", routes);

module.exports = app;
