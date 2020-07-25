const express = require('express');
const router = express.Router();
const HttpStatus = require('http-status-codes');
const Selection = require('../models/Selection');

router.get('/', async (req, res) => {
  const selections = await Selection.find();
  try {
    const selections = await Selection.find();
    res.status(HttpStatus.OK).json(selections);
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

router.put('/', async (req, res) => {
  try {
    if (!req.body || !Array.isArray(req.body.selections)) {
      res.status(HttpStatus.BAD_REQUEST).end();
      return;
    }
    try {
      await Selection.collection.drop();
    } catch (err) {
      console.log(err);
    }
    if (req.body.selections.length > 0) {
      await Selection.collection.insertMany(
        req.body.selections,
        { ordered: false }
      );
    }
    res.status(HttpStatus.NO_CONTENT).end();
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

module.exports = router;
