const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dateSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  client: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    lowercase:true
  },

  hour: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  state: {
    type: Boolean,
    default: false,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Date", dateSchema);
