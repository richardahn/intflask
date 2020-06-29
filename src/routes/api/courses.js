const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const getEmptyCourseData = require('../../utils/course').getEmptyCourseData;

const Course = require('../../models/Course');

// -- Read --
/** Sends back all the courses' metadata(excludes the course content) */
router.get('/', (req, res) => {
  Course.find({}, { data: 0 }, (err, courses) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error getting courses');
    } else {
      res.json(courses);
    }
  });
});

module.exports = router;
