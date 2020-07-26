const express = require('express');
const router = express.Router();
const HttpStatus = require('http-status-codes');
const Selection = require('../models/Selection');

router.get('/scout', async (req, res) => {
  try {
    const commands = await Selection.find({
      scoutName: { $in: req.authorizedUser.accounts }
    })
    res.status(HttpStatus.OK).json(commands);
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

router.get('/ghost', async (req, res) => {
  try {
    const commands = await Selection.find({
      ghostName: { $in: req.authorizedUser.accounts }
    })
    res.status(HttpStatus.OK).json(commands);
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

module.exports = router;
