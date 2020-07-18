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
const User = require('../../models/User');

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
    const or = [];
    if (req.query.selectedTechnologies) {
      filter.technologyStack = { $in: req.query.selectedTechnologies };
    }
    if (req.query.selectedFree === 'true') {
      filter.price = 0;
    }
    if (req.query.query) {
      or.push(
        ...[
          {
            name: new RegExp(`${req.query.query}`, 'i'),
          },
          {
            description: new RegExp(`${req.query.query}`, 'i'),
          },
        ],
      );
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
      let query = Tutorial.find(filter, projection);
      if (or.length != 0) {
        query = query.or(or);
      }
      query = query.sort(sort);
      const tutorials = await query.exec();
      res.json(tutorials);
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to get tutorials');
    }
  }
});

router.get(
  '/:slug',
  passport.authenticate(['jwt', 'anonymous'], { session: false }),
  async (req, res) => {
    try {
      const tutorial = await Tutorial.findOne({
        deployed: true,
        slug: req.params.slug,
      })
        .populate('userId', { firstName: true, lastName: true })
        .populate('reviews.userId', { firstName: true, lastName: true })
        .lean() // Mongoose objects can't be modified, use lean() to get a regular js object
        .exec();

      const { content, ...outlinedTutorial } = tutorial;
      outlinedTutorial.outline = convertTutorialContentToOutline(content);
      if (req.query.content && req.query.content === 'true') {
        outlinedTutorial.content = content;
      }
      if (req.user) {
        const user = await User.findOne({
          _id: req.user.id,
        })
          .populate({
            path: 'purchases',
            match: { tutorialId: tutorial._id },
          })
          .exec();
        outlinedTutorial.reviewed = tutorial.reviews.some(
          (review) => review.userId._id.toString() === req.user.id,
        );
        outlinedTutorial.purchased = user.purchases.length > 0;
      } else {
        outlinedTutorial.purchased = false;
      }
      res.json(outlinedTutorial);
    } catch (error) {
      console.error(error);
      res.status(500).send('Could not find tutorial');
    }
  },
);

router.post(
  '/:slug/review',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const tutorial = await Tutorial.findOne(
        {
          slug: req.params.slug,
        },
        { reviews: true, _id: true },
      ).exec();
      // Make sure user purchased tutorial
      const user = await User.findOne({
        _id: req.user.id,
      })
        .populate({ path: 'purchases', match: { tutorialId: tutorial.id } })
        .exec();
      if (user.purchases.length > 0) {
        if (
          tutorial.reviews.some(
            (review) => review.userId.toString() === req.user.id,
          )
        ) {
          return res.status(400).send('User has already submitted a review');
        }
        tutorial.reviews.push({
          userId: req.user.id,
          date: Date.now(),
          ...req.body,
        });
        await tutorial.save();
        res.status(204).end();
      } else {
        const err =
          "User attempted to write a review for a tutorial they didn't purchase";
        console.error(err);
        res.status(500, err);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to submit review');
    }
  },
);

module.exports = router;
