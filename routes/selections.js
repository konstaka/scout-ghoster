const express = require('express');
const router = express.Router();
const HttpStatus = require('http-status-codes');
const Selection = require('../models/Selection');
const Attacker = require('../models/Attacker');
const Village = require('../models/Village');
const Scout = require('../models/Scout');
const Ghost = require('../models/Ghost');

router.post('/', async (req, res) => {
  try {
    if (!req.body) {
      res.status(HttpStatus.BAD_REQUEST).end();
      return;
    }
    let selection = await Selection.findOne({
      targetId: req.body.targetId,
      attackerId: req.body.attackerId
    })
    if (!selection) {
      selection = new Selection(req.body);
      await selection.save();
    }
    res.location('/selections/' + selection._id);
    res.status(HttpStatus.CREATED).end();
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

router.get('/', async (req, res) => {
  try {
    const compiledSelections = [];
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

router.put('/:selectionId', async (req, res) => {
  try {
    if (!req.body || !req.body._id || req.body._id !== req.params.selectionId) {
      res.status(HttpStatus.BAD_REQUEST).end();
      return;
    }
    await Selection.findByIdAndUpdate(req.params.selectionId, req.body);
    res.status(HttpStatus.NO_CONTENT).end();
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

router.delete('/:selectionId', async (req, res) => {
  try {
    await Selection.deleteOne({ _id: req.params.selectionId });
    res.status(HttpStatus.NO_CONTENT).end();
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

module.exports = router;
