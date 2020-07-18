const express = require('express');
const router = express.Router();
const HttpStatus = require('http-status-codes');
const scouts = require('../util/scouts');

router.post('/', async (req, res) => {
  try {
    if (!req.body) {
      res.status(HttpStatus.BAD_REQUEST).end();
      return;
    }
    const scout = await scouts.saveScout(req.authorizedUser, req.body);
    if (scout._id) {
      res.location('/scouts/' + scout._id);
      res.status(HttpStatus.CREATED).end();
    } else {
      res.status(HttpStatus.FORBIDDEN).json({ message: scout });
    }
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await scouts.getScouts();
    res.status(HttpStatus.OK).json(result.filter((scout) => {
      return req.authorizedUser.roles.includes('admin')
        || req.authorizedUser.roles.includes('defcoord')
        || req.authorizedUser.accounts.includes(scout.player)
    }));
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

router.put('/:scoutId', async (req, res) => {
  try {
    if (!req.body) {
      res.status(HttpStatus.BAD_REQUEST).end();
      return;
    }
    const toUpdate = req.body;
    toUpdate._id = req.params.scoutId;
    const scout = await scouts.saveScout(req.body);
    if (scout._id) {
      res.status(HttpStatus.NO_CONTENT).end();
    } else {
      res.status(HttpStatus.FORBIDDEN).json({ message: scout });
    }
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

router.delete('/:scoutId', async (req, res) => {
  try {
    const deleted = await scouts.deleteScout(
      req.authorizedUser,
      req.params.scoutId
    );
    if (!deleted) {
      res.status(HttpStatus.NOT_FOUND).end();
      return;
    }
    if (!deleted._id) {
      res.status(HttpStatus.FORBIDDEN).json({ message: deleted });
    }
    res.status(HttpStatus.NO_CONTENT).end();
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

module.exports = router;
