const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const PageSchema = new mongoose.Schema(
  {
    name: { type: String },
    content: { type: String },
  },
  { _id: false },
);

const TopicSchema = new mongoose.Schema(
  {
    name: { type: String },
    content: { type: String },
    children: [PageSchema],
  },
  { _id: false },
);

const CourseSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId },
  courseName: { type: String, required: true },
  slug: { type: String, slug: 'courseName', unique: true },
  price: { type: Number },
  data: new mongoose.Schema(
    {
      main: PageSchema,
      children: [PageSchema | TopicSchema],
    },
    { _id: false },
  ),
});

module.exports = mongoose.model('courses', CourseSchema);
