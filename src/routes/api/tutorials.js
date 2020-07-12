const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const Tutorial = require('../../models/Tutorial');

// -- Read --
/** Sends back all the tutorials' metadata(excludes the tutorial content) */
router.get('/', (req, res) => {
  Tutorial.find({ deployed: true }, { data: 0 }, (err, tutorials) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error getting tutorials');
    } else {
      res.json(tutorials);
    }
  });
});

router.get('/top', async (req, res) => {
  try {
    const count = req.query.count ? parseInt(req.query.count) : 3;
    const tutorials = await Tutorial.find(
      { deployed: true },
      { content: false },
    )
      .sort({ 'statistics.purchases': -1 })
      .limit(count)
      .exec();
    res.json(tutorials);
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to get top tutorials');
  }
});

router.get('/free', async (req, res) => {
  try {
    const count = req.query.count ? parseInt(req.query.count) : 3;
    const tutorials = await Tutorial.find(
      { deployed: true, price: 0 },
      { content: false },
    )
      .sort({ 'statistics.purchases': -1 })
      .limit(count)
      .exec();
    res.json(tutorials);
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to get free tutorials');
  }
});

module.exports = router;
