// lee .env
require("dotenv").config({ path: ".env" });
// librerias
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// Autentica a el usuario registrado
exports.userAuth = async (req, res) => {
  // si el usuario no fue encontrado en la db con el dataMiddleware.
  if (!req.user) {
    res.status(401).json({ msg: "El usuario no existe" });
    return;
  }

  // extrae datos de req.usuario, el cual lo inyecto el dataMiddleware para firmar el token
  const { username, name, _id } = req.user;

  // comparar el "password" de req.body con el "password" con hash del req.usuario
  if (bycrypt.compareSync(req.body.password, req.user.password)) {
    // crear y firmar token
    const token = jwt.sign(
      {
        name,
        username,
        _id,
      },
      process.env.SECRET_JWT,
      { expiresIn: "8h" }
    );
    // respuesta
    res.json({ token, msg: `Bienvenido ${username}` });
  } else {
    // el password que se ingreso es incorrecto
    res.status(401).json({ msg: "Password incorrecto" });
    return;
  }

  try {
  } catch (error) {
    console.log("Hubo un error al autenticar el usuario");
  }
};

/* retorna el objeto del usuario autenticado, que proviene de req.user
  que inyecta authMiddleware, que extrae token de las cabeceras "Authorization" de la request.
*/
exports.authUser = (req, res) => {
  console.log(req.user);
  if (req.user) {
    res.json({ user: req.user });
  }
};
