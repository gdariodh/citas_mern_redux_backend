const DateModel = require("../dateModel");

// TODO: FILTROS
exports.getDateByCategory = async (req, res) => {
  // categoria
  const category = req.params.category;
  const userId = req.user._id;

  try {
    // filtrar citas de usuario autenticado
    const dates = await DateModel.find({ author: userId }).sort("-_id");

    //filtrar esas citas de usuario por categoria
    const datesByCategory = dates.filter((date) => date.category === category);

    if (datesByCategory.length === 0) {
      res
        .status(404)
        .json({ msg: `No hay citas relacionadas con ${category}` });
    } else {
      res.json({ datesByCategory });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un problema con el servidor" });
  }
};

exports.handleLikes = async (req, res) => {
  // extraer el id de la cita
  const dateId = req.params.id;
  // buscar cita
  try {
    let date = await DateModel.findOne({ _id: dateId });
    date.favorite = true;
    date.save();
    res.json({ msg: "La cita ha sido marcada como favorita" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un problema con el servidor" });
  }
};
exports.deleteLikes = async (req, res) => {
  // extraer el id de la cita
  const dateId = req.params.id;
  // buscar cita
  try {
    let date = await DateModel.findOne({ _id: dateId });
    date.favorite = false;
    date.save();
    res.json({ msg: "La cita ha sido eliminada de favoritos" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un problema con el servidor" });
  }
};

exports.getDatesByLikes = async (req, res) => {
  const userId = req.user._id;

  try {
    const dates = await DateModel.find({ author: userId }).sort("-_id");
    //console.log(dates);

    const datesByLikes = dates.filter((date) => date.favorite === true);

    if (datesByLikes.length === 0) {
      res.status(404).json({ msg: `No hay citas favoritas` });
    } else {
      res.json({ datesByLikes });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un problema con el servidor" });
  }
};
