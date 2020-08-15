const express = require('express');

const router = express.Router();
const HttpStatus = require('http-status-codes');

router.get('/', async (req, res) => {
  res.status(HttpStatus.OK).json(req.authorizedUser);
});

module.exports = router;
