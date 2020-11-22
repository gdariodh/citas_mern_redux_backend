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
  state: {
    type: Boolean,
    default: false,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Date", dateSchema);
