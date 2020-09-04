const express = require('express');

const router = express.Router();
const HttpStatus = require('http-status-codes');
const FlexSecond = require('../models/FlexSecond');

router.get('/', async (req, res) => {
  try {
    const resObj = {};
    const data = await FlexSecond.find();
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (!resObj[item.targetId]) {
        resObj[item.targetId] = {};
      }
      resObj[item.targetId][item.attackerId] = item.seconds;
    }
    res.status(HttpStatus.OK).json(resObj);
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
    const items = [];
    const targetIds = Object.keys(req.body);
    for (let i = 0; i < targetIds.length; i++) {
      const targetId = targetIds[i];
      const attackerIds = Object.keys(req.body[targetId]);
      for (let j = 0; j < attackerIds.length; j++) {
        const attackerId = attackerIds[j];
        items.push(new FlexSecond({
          targetId,
          attackerId,
          seconds: req.body[targetId][attackerId],
        }));
      }
    }
    try {
      await FlexSecond.collection.drop();
    } catch (err) {
      console.log(err);
    }
    await FlexSecond.collection.insertMany(items, { ordered: false });
    res.status(HttpStatus.NO_CONTENT).end();
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

module.exports = router;
