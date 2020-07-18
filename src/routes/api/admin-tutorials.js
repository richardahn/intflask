const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const getEmptyTutorialContent = require('../../utils/tutorial')
  .getEmptyTutorialContent;

const Tutorial = require('../../models/Tutorial');

// -- Create --
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const currentDate = Date.now();
    const tutorial = new Tutorial({
      userId: mongoose.Types.ObjectId(req.user.id),
      name: req.body.name,
      description: req.body.description,
      technologyStack: req.body.technologyStack,
      price: req.body.price,
      deployed: false,
      content: getEmptyTutorialContent(),
      creationDate: currentDate,
      modifiedDate: currentDate,
      reviews: [],
      purchases: [],
    });

    tutorial
      .save()
      .then((tutorial) => res.json(tutorial))
      .catch((error) => {
        console.error(error);
        res.status(500).send('Failed to create tutorial');
      });
  },
);

// -- Read --
/** Sends back all the author's tutorials' metadata(excludes the tutorial content) */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Tutorial.find(
      { userId: req.user.id },
      { content: false },
      (err, tutorials) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error getting tutorials');
        } else {
          res.json(tutorials);
        }
      },
    );
  },
);
router.get(
  '/:slug',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const projection = {};
      if (req.query.content === 'false') {
        projection.content = false;
      }
      const tutorial = await Tutorial.findOne(
        { userId: req.user.id, slug: req.params.slug },
        projection,
      )
        .populate('purchases')
        .exec();

      if (tutorial) {
        res.json(tutorial);
      } else {
        console.error(err);
        res.status(404).send('Could not find tutorial.');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to get tutorial');
    }
  },
);

// -- Update --
router.put(
  '/:slug',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const tutorial = await Tutorial.findOneAndUpdate(
        { userId: req.user.id, slug: req.params.slug },
        { ...req.body, modifiedDate: Date.now() },
        { new: true },
      ).exec(); // exec() returns a Promise
      res.status(200).send(tutorial.slug);
      // res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to update tutorial');
    }
  },
);

router.delete(
  '/:slug',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const tutorial = await Tutorial.findOne({
        userId: req.user.id,
        slug: req.params.slug,
      }).exec();
      await tutorial.remove();
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to delete tutorial');
    }
  },
);

module.exports = router;
