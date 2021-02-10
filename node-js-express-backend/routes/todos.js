const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const idlength = 8;

const DELAY = 1000;

router.get("/", (req, res) => {
  const todos = req.app.db.get("todos");

  setTimeout(() => {
    res.send(todos);
  }, DELAY);
});

router.get("/:id", (req, res) => {
  const todo = req.app.db.get("todos").find({ id: req.params.id }).value();

  setTimeout(() => {
    res.send(todo);
  }, DELAY);
});

router.post("/", (req, res) => {
  try {
    const todo = {
      id: nanoid(idlength),
      ...req.body,
      done: false,
    };
    req.app.db.get("todos").push(todo).write();

    setTimeout(() => {
      res.send(todo);
    }, DELAY);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put("/:id", (req, res) => {
  try {
    req.app.db
      .get("todos")
      .find({ id: req.params.id })
      .assign(req.body)
      .write();

    setTimeout(() => {
      res.send(req.app.db.get("todos").find({ id: req.params.id }));
    }, DELAY);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.delete("/:id", (req, res) => {
  req.app.db.get("todos").remove({ id: req.params.id }).write();

  setTimeout(() => {
    res.sendStatus(200);
  }, DELAY);
});

module.exports = router;
