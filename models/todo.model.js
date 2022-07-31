const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
  },
});

mongoose.model("todo", todoSchema);

module.exports = todoSchema;
