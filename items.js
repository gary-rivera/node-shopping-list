const express = require("express");
const db = require("./fakeDb");
const router = new express.Router();

router.get("/", function (req, res, next) {
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
  next();
});

router.patch("/:name", function (req, res, next) {
  for (let i = 0; i <db.items.length; i++) {
    if (db.items[i].name === req.params.name) {

      db.items[i].name = req.body.name;
      db.items[1].price = req.body.price;

      return res.json({ item: db.items[i] });
    }
  }
  next();
});

router.delete("/:name", function (req, res, next) {
  for (let i in db.items) {
    if (db.items[i].name === req.params.name) {
      db.items.splice(i, 1);
      
      return res.json({ message: "deleted" });
    }
  }
  next()
});

module.exports = router;
