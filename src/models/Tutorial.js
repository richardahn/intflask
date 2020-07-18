const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const Purchase = require('./Purchase');
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

const StatisticsSchema = new mongoose.Schema({}, { _id: false });

const ReviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'users' },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { _id: false },
);
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
  creationDate: { type: Date, required: true },
  modifiedDate: { type: Date },
  reviews: [ReviewSchema],
  purchases: [{ type: mongoose.Types.ObjectId, ref: 'purchases' }],
});

TutorialSchema.pre('remove', async function (next) {
  const purchase = await Purchase.findOne({ tutorialId: this._id }).exec();
  await purchase.remove();
  next();
});

module.exports = mongoose.model('tutorials', TutorialSchema);
