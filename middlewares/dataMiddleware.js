/* TODO: Comprueba la "data" que se le pasa por el req.body.
  Y compara esa data con el email o username del usuario, si existe el usuario
  inyecta el objeto de usuario en req.user. y pasa al siguiente controlador 
  "userAuth".
*/

// Esto para permitir el inicio de sesion nada mas con el email o username.

// modelo usado para comprobar si existe o no el usuario
const User = require("../Api/user/userModel");

module.exports = async (req, res, next) => {
  try {
    const data = req.body.data;
    // buscar usuario por email o username.
    const email = await User.findOne({ email: data });
    const username = await User.findOne({ username: data });

    // si hay un usuario con ese email.
    if (email) {
      // inyectar el objeto de usuario encontrado por el email.
      req.user = email;
      next();
    } else if (username) {
      // inyectar el objeto de usuario encontrado por el username.
      req.user = username;
      next();
    } else {
      // no se encontro ningun usuario relacionado con esa data
      return res.status(401).json({ msg: "El usuario no existe" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Hubo un error al autenticar el usuario" });
  }
};
