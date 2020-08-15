const express = require('express');

const router = express.Router();
const HttpStatus = require('http-status-codes');
const OperationMeta = require('../models/OperationMeta');

router.get('/', async (req, res) => {
  try {
    const data = await OperationMeta.findOne();
    res.status(HttpStatus.OK).json(data);
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

router.put('/', async (req, res) => {
  try {
    if (!req.body) {
      res.status(HttpStatus.BAD_REQUEST).end();
      return;
    }
    try {
      await OperationMeta.collection.drop();
    } catch (err) {
      console.log(err);
    }
    const data = new OperationMeta(req.body);
    await data.save();
    res.status(HttpStatus.NO_CONTENT).end();
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

module.exports = router;
