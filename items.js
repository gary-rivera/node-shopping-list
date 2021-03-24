const express = require("express");
const db = require("./fakeDb");

const router = new express.Router();

router.get("/", function (req, res, next) {
  // console.log(res.json(db.items))

  return res.json({ items: db.items });
});

router.post("/", function (req, res, next) {
  const newItem = { name: req.body.name, price: req.body.price };
  db.items.push(newItem);
  return res.status(201).json({ item: newItem });
});

router.get("/:name", function (req, res, next) {
  for (let grocery of db.items) {
    if (grocery.name === req.params.name) {
      return res.json({ item: grocery });
    }
  }
});

router.patch("/:name", function (req, res, next) {
  // console.log(db.items.indexOf(req.params.name));
  // let item = db.items[db.items.indexOf(req.params.name)];
  for (let i in db.items) {
    if (db.items[i].name === req.params.name) {
      let item = db.items[i];

      item.name = req.body.name;
      item.price = req.body.price;
      db.items.splice(i, 1, item);
      return res.json({ item: db.items[i] });
    }
  }
});

router.delete("/:name", function (req, res, next) {
  for (let i in db.items) {
    if (db.items[i].name === req.params.name) {
      db.items.splice(i, 1);
      return res.json({ message: "deleted" });
    }
  }
});

module.exports = router;
