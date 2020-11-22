/* Extrae el token de las cabeceras "Authorization" de la request e inyecta el objeto de usuario
 en req.user*/

// nos sirve para verificar si el token es correcto
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // extrae el token de autenticacion de las cabeceras
  const tokenHeader = req.get("Authorization");

  if (tokenHeader) {
    // split sirve para separar, por defecto viene "Bearer 123". con split quedaria "123" que es el token
    const token = tokenHeader.split(" ")[1];

    try {
      // validar el token de las cabeceras
      const user = jwt.verify(token, process.env.SECRET_JWT);
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ msg: "Acceso denegado" });
      return;
    }
  } else {
    res.status(401).json({ msg: "No hay token, acceso denegado" });
    return;
  }
};
