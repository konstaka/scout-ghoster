const express = require('express');
const router = express.Router();
const HttpStatus = require('http-status-codes');
const mapSql = require('../util/mapSql');

router.get('/', async (req, res) => {
  // Only update the map if it's older than one hour
  const threshold = new Date();
  threshold.setHours(threshold.getHours() - 1);
  const updatedAt = await mapSql.updatedAt();
  if (updatedAt < threshold) {
    const amount = await mapSql.update();
    res.status(HttpStatus.OK).json({ villages: amount });
  } else {
    res.status(HttpStatus.FORBIDDEN).json({
      message: 'Last updated less than one hour ago'
    });
  }
});

module.exports = router;
