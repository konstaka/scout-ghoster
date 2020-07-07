const express = require('express');
const router = express.Router();
const HttpStatus = require('http-status-codes');
const Village = require('../models/Village');

router.get('/', async (req, res) => {
  try {
    const villages = await Village.find({ allyName: process.env.ALLY_NAME });
    res.status(HttpStatus.OK).json(villages);
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

module.exports = router;
