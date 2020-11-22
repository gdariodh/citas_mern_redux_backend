const express = require("express");
const app = express();
const routes = require("./routes");

// leer datos que pasan por el req.body
app.use(express.json());
app.use(express.urlencoded({extended:false}))
// rutas generales
app.use("/api", routes);

module.exports = app;
