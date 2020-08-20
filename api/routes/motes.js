const express = require('express');
const router = express.Router();
const mote = require('../models/Mote');

router.get('/', (req, res) => {
  res.send('We are on motes');
});

router.post('/', (req, res) => {
  console.log(req.body.moteId);
});

module.exports = router;
