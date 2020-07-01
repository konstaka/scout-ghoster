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
    const attacker = await attackers.saveAttacker(req.body);
    res.location('/attackers/' + attacker._id);
    res.status(HttpStatus.CREATED).end();
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

router.delete('/:attackerId', async (req, res) => {
  try {
    const deleted = await attackers.deleteAttacker(req.params.attackerId);
    if (!deleted) {
      res.status(HttpStatus.NOT_FOUND).end();
      return;
    }
    res.status(HttpStatus.NO_CONTENT).end();
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

module.exports = router;
