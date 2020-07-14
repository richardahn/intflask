const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const convertTutorialContentToOutline = require('../../utils/tutorial')
  .convertTutorialContentToOutline;

const Tutorial = require('../../models/Tutorial');

// -- Read --
/** Sends back all the tutorials' metadata(excludes the tutorial content) */
router.get('/', async (req, res) => {
  if (req.query.top === 'true') {
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
  } else if (req.query.free === 'true') {
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
  } else {
    const filter = { deployed: true };
    const projection = { content: false };
    const sort = {};
    if (req.query.selectedTechnologies) {
      filter.technologyStack = { $in: req.query.selectedTechnologies };
    }
    if (req.query.selectedFree === 'true') {
      filter.price = 0;
    }
    if (req.query.query) {
      filter.name = new RegExp(`${req.query.query}`, 'i');
    }
    const sortDirection = req.query.descending === 'false' ? 1 : -1;
    switch (req.query.sortedBy) {
      case 'popularity':
        sort['statistics.purchases'] = sortDirection;
        break;
      case 'price':
        sort.price = sortDirection;
        break;
      case 'name':
        sort.name = sortDirection;
        break;
    }
    try {
      const tutorials = await Tutorial.find(filter, projection)
        .sort(sort)
        .exec();
      res.json(tutorials);
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to get tutorials');
    }
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const tutorial = await Tutorial.findOne({
      deployed: true,
      slug: req.params.slug,
    })
      .populate('userId', { firstName: true, lastName: true })
      .lean() // Mongoose objects can't be modified, use lean() to get a regular js object
      .exec();

    const { content, ...outlinedTutorial } = tutorial;
    outlinedTutorial.outline = convertTutorialContentToOutline(content);
    res.json(outlinedTutorial);
  } catch (error) {
    console.error(error);
    res.status(500).send('Could not find tutorial');
  }
});

module.exports = router;
