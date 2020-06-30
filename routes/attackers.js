const express = require('express');
const router = express.Router();
const HttpStatus = require('http-status-codes');
const attackers = require('../util/attackers');

router.post('/', async (req, res) => {
  try {
    if (!req.body || !req.body.x || !req.body.y) {
      res.status(HttpStatus.BAD_REQUEST).end();
      return;
    }
    const existed = await attackers.saveAttacker(req.body);
    if (existed) {
      res.status(HttpStatus.OK).end();
    } else {
      res.status(HttpStatus.CREATED).end();
    }
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await attackers.getAttackers();
    res.status(HttpStatus.OK).json(result);
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

router.delete('/:x/:y', async (req, res) => {
  try {
    await attackers.deleteAttacker({ x: req.params.x, y: req.params.y });
    res.status(HttpStatus.OK).end();
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

module.exports = router;
