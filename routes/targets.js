const express = require('express');

const router = express.Router();
const HttpStatus = require('http-status-codes');
const Village = require('../models/Village');
const Filter = require('../models/Filter');

router.get('/', async (req, res) => {
  try {
    const villages = await Village.find({ allyName: process.env.ALLY_NAME });
    res.status(HttpStatus.OK).json(villages);
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

router.get('/filter', async (req, res) => {
  try {
    const filterObj = {};
    const filterArray = await Filter.find();
    for (let i = 0; i < filterArray.length; i++) {
      filterObj[filterArray[i].coordId] = filterArray[i].isVisible;
    }
    res.status(HttpStatus.OK).json(filterObj);
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

router.put('/filter/:coordId', async (req, res) => {
  try {
    if (!req.body) {
      res.status(HttpStatus.BAD_REQUEST).end();
      return;
    }
    const changed = await Filter.findOneAndUpdate(
      { coordId: req.params.coordId },
      {
        coordId: req.params.coordId,
        isVisible: req.body.isVisible,
      },
      {
        new: true,
        upsert: true,
      },
    );
    if (changed) {
      res.status(HttpStatus.NO_CONTENT).end();
    } else {
      res.status(HttpStatus.NOT_FOUND).end();
    }
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

module.exports = router;
