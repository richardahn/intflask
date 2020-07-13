const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const PageSchema = new mongoose.Schema(
  {
    name: { type: String },
    content: { type: String },
  },
  { _id: false },
);

const PageGroupSchema = new mongoose.Schema(
  {
    name: { type: String },
    content: { type: String },
    children: [PageSchema],
  },
  { _id: false },
);

const StatisticsSchema = new mongoose.Schema({
  purchases: Number,
});
const TutorialSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, ref: 'users' },
  slug: { type: String, slug: 'name', unique: true },
  name: { type: String, required: true },
  description: { type: String },
  technologyStack: [String],
  price: { type: Number, required: true },
  deployed: { type: Boolean, required: true },
  content: new mongoose.Schema(
    {
      main: PageSchema,
      children: [PageSchema | PageGroupSchema],
    },
    { _id: false },
  ),
  statistics: StatisticsSchema,
  approximateCompletionTime: { type: Number },
});

module.exports = mongoose.model('tutorials', TutorialSchema);
