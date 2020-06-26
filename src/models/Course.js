const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
  name: { type: String },
  content: { type: String },
});

const TopicSchema = new mongoose.Schema({
  name: { type: String },
  content: { type: String },
  children: [PageSchema],
});

const CourseSchema = new mongoose.Schema({
  main: PageSchema,
  children: [PageSchema | TopicSchema],
});

module.exports = mongoose.model('courses', CourseSchema);
