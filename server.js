const connection = require("./models/DBConnection");
const todoModel = require("./models/todo.model");
const express = require("express");
const bodyparser = require("body-parser");
const http = require("http");
const path = require("path");
const cors = require("cors");
const { default: mongoose } = require("mongoose");

const app = express();

const corsOption = {
  origin: "http://localhost:3001",
};

app.use(cors(corsOption));
app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);

const ToDoModel = mongoose.model("todo");

app.get("/todos", (req, res) => {
  console.log(req.query);

  if (req.query.searchTerm) {
    ToDoModel.find(async (err, docs) => {
      console.log(docs.length);
      const data = await docs.filter((todo) =>
        todo.title.includes(req.query.searchTerm)
      );

      console.log(data);
      res.send({
        data: data.slice(0, Number(req.query.pageSize)),
        items: data.length,
      });
    });
  } else {
    ToDoModel.find((err, docs) => {
      res.send({
        data: docs.slice(
          (+req.query.page - 1) * +req.query.pageSize,
          (+req.query.page - 1) * +req.query.pageSize + +req.query.pageSize
        ),
      });
    });
  }
});

app.post("/createToDo", async (req, res) => {
  console.log(req.body);
  const newToDo = new ToDoModel();
  newToDo.title = req.body.title;
  await newToDo.save();

  ToDoModel.find((err, docs) => {
    res.send({ data: docs });
  });
});

app.delete("/deleteTodo/:id", async (req, res) => {
  const id = req.params.id;
  await ToDoModel.findByIdAndDelete(id);

  ToDoModel.find((err, docs) => {
    res.send({ data });
  });
});

const httpServer = http.createServer(app);
httpServer.listen(3000);
