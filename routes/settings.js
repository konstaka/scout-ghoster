const express = require('express');
const router = express.Router();
const HttpStatus = require('http-status-codes');

router.get('/', (req, res) => {
  try {
    res.status(HttpStatus.OK).json({
      size: process.env.SERVER_SIZE,
      speed: process.env.SERVER_SPEED
    });
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

module.exports = router;
