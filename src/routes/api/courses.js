const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const getEmptyCourseData = require('../../utils/course').getEmptyCourseData;

const Course = require('../../models/Course');

// -- Create --
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const course = new Course({
      userId: mongoose.Types.ObjectId(req.user.id),
      courseName: req.body.courseName,
      price: req.body.price,
      data: getEmptyCourseData(),
    });

    course
      .save()
      .then((course) => res.json(course))
      .catch((error) => {
        console.error(error);
        res.status(500).send('Failed to create course');
      });
  },
);

// -- Read --
/** Sends back all the courses' metadata(excludes the course content) */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Course.find({ userId: req.user.id }, { data: 0 }, (err, courses) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error getting courses');
      } else {
        res.json(courses);
      }
    });
  },
);
router.get(
  '/:slug',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Course.findOne(
      { userId: req.user.id, slug: req.params.slug },
      (err, course) => {
        if (course) {
          res.json(course);
        } else {
          console.error(err);
          res.status(404).send('Could not find course.');
        }
      },
    );
  },
);

// -- Update --
router.put(
  '/:slug',
  // passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      await Course.findOneAndUpdate(
        { userId: req.user.id, slug: req.params.slug },
        req.body,
      ).exec(); // exec() returns a Promise
      res.status(204).end(); // No data needs to be sent back
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to update course');
    }
  },
);

module.exports = router;
