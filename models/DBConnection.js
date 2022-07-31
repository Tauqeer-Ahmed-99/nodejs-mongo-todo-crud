const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/todo-database",
  { useNewUrlParser: true },
  (error) => {
    console.log(error);
    if (!error) {
      console.log("Connection to Database succesful!!!");
    } else {
      console.error("Connection to Database failed!!!");
    }
  }
);

const todo = require("./todo.model");
