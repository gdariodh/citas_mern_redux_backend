const User = require("./userModel");
// librerias
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  // TODO: errores de express validator
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { email, username, password } = req.body;

  // verificar si existe el usuario
  let user = await User.findOne({ email });
  // verificar que el nombre de usuario no este repetido
  let repeatUsername = await User.findOne({ username });

  // si hay usuario registrado
  if (user) {
    res.status(401).json({ msg: "Email registrado, intenta con otro" });
    return;
  } else if (repeatUsername) {
    // si hay nombre de usuario repetido
    res
      .status(401)
      .json({ msg: "Nombre de usuario registrado, intenta con otro" });
    return;
  }

  // TODO: almacenar el nuevo usuario y asignar nuevo token.
  try {
    // crear el nuevo usuario
    user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    // agregar el hash del password
    user.password = hash;
    // almacenar el nuevo usuario en la db
    await user.save();

    // buscamos el nuevo usuario registrado en la db para asignarle un nuevo token
    const userToken = await User.findOne({ email });
    const { name, username, _id } = userToken;
    // crear y firmar un nuevo token
    const token = jwt.sign(
      {
        name,
        username,
        _id,
      },
      process.env.SECRET_JWT,
      { expiresIn: "8h" }
    );
    res.json({ msg: 'Usuario creado exitosamente', token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un problema al crear el usuario" });
  }
};
