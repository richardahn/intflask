const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const Tutorial = require('../../models/Tutorial');

router.get('/', async (req, res) => {
  try {
    const allTechnologies = await Tutorial.find()
      .distinct('technologyStack')
      .exec();
    console.log(allTechnologies);
    res.json(allTechnologies);
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to find all technologies');
  }
});

module.exports = router;
