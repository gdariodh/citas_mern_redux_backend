const DateModel = require("./dateModel");
const { validationResult } = require("express-validator");

// TODO: CRUD
exports.createDate = async (req, res) => {
  // errores express validator
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const userId = req.user._id;
  const date = new DateModel(req.body);
  date.author = userId;

  try {
    await date.save();
    res.json({ date, msg:"Cita creada" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un problema con el servidor" });
  }
};

exports.getDates = async (req, res) => {
  const userId = req.user._id;

  try {
    const dates = await DateModel.find({ author: userId }).sort("-_id");
    if (dates) {
      res.json({ dates });
    } else {
      res.status(404).json({ msg: "No hay citas, crea una" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un problema con el servidor" });
  }
};

exports.editDate = async (req, res) => {
  // errores express validator
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  // id de cita para editar
  const dateId = req.params.id;
  const userId = req.user._id;
  // extraer data del body que sera la que remplazara la antigua data de la cita
  const { name, description, client, hour, category } = req.body;

  try {
    let date = await DateModel.findOne({ _id: dateId });
    if (!date) return res.status(404).json({ msg: "Cita no encontrada" });

    // verificar que el creador de la cita sea el mismo
    if (date.author.toString() !== userId) {
      res
        .status(401)
        .json({ msg: "Usuario no autorizado para editar la cita" });
    } else {
      // TODO: El usuario es el creador de la cita, rellenar la nueva data que remplazara la antigua data de la cita
      let data = {
        name,
        description,
        client,
        date: req.body.date,
        hour,
        category,
      };
      // almacenar la cita actualizada
      const date = await DateModel.findOneAndUpdate({ _id: dateId }, data, {
        new: true,
      });

      res.json({ date, msg: "Cita editada" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un problema con el servidor" });
  }
};

exports.deleteDate = async (req, res) => {
  const dateId = req.params.id;
  const userId = req.user._id;

  try {
    let date = await DateModel.findById(dateId);

    if (!date) {
      return res.status(404).json({ msg: "La cita no existe" });
    }

    // verificar si es el creador de la cita
    if (date.author.toString() !== userId) {
      return res
        .status(401)
        .json({ msg: "Usuario no autorizado para eliminar la cita" });
    }

    await DateModel.findOneAndRemove({ _id: dateId });
    res.json({ msg: "La cita ha sido eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un problema con el servidor" });
  }
};
