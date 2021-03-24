const express = require("express");
const db = require('./fakeDb');

const router = new express.Router();

router.get('/', function(req, res, next) {
  // console.log(res.json(db.items))
  
  return res.json({items: db.items})
});

router.post('/', function(req, res, next) {
  const newItem = { name: req.body.name, price: req.body.price }
  db.items.push(newItem)
  return res.status(201).json({item: newItem})
});


module.exports = router