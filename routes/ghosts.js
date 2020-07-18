const express = require('express');
const router = express.Router();
const HttpStatus = require('http-status-codes');
const ghosts = require('../util/ghosts');

router.post('/', async (req, res) => {
  try {
    if (!req.body) {
      res.status(HttpStatus.BAD_REQUEST).end();
      return;
    }
    const ghost = await ghosts.saveGhost(req.authorizedUser, req.body);
    if (ghost._id) {
      res.location('/ghosts/' + ghost._id);
      res.status(HttpStatus.CREATED).end();
    } else {
      res.status(HttpStatus.FORBIDDEN).json({ message: ghost });
    }
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await ghosts.getGhosts(req.authorizedUser);
    res.status(HttpStatus.OK).json(result);
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

router.put('/:ghostId', async (req, res) => {
  try {
    if (!req.body) {
      res.status(HttpStatus.BAD_REQUEST).end();
      return;
    }
    const toUpdate = req.body;
    toUpdate._id = req.params.ghostId;
    const ghost = await ghosts.saveGhost(req.authorizedUser, req.body);
    if (ghost._id) {
      res.status(HttpStatus.NO_CONTENT).end();
    } else {
      res.status(HttpStatus.FORBIDDEN).json({ message: ghost });
    }
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
});

router.delete('/:ghostId', async (req, res) => {
  try {
    const deleted = await ghosts.deleteGhost(
      req.authorizedUser,
      req.params.ghostId
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
