const mongoose = require('mongoose');
const User = require('./User');

const PurchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, ref: 'users' },
  tutorialId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'tutorials',
  },
  price: { type: Number, required: true },
  date: { type: Date, required: true },
});

PurchaseSchema.pre('remove', async function (next) {
  // Remove this purchase from purchases array in both user and tutorial
  await User.updateOne(
    { _id: this.userId, purchases: this._id },
    { $pull: { purchases: this._id } },
  ).exec();
  // To avoid a cyclical dependency(between Purchase and Tutorial), lazy load the model. Otherwise, Tutorial will be empty
  await mongoose
    .model('tutorials')
    .updateOne(
      { _id: this.tutorialId, purchases: this._id },
      { $pull: { purchases: this._id } },
    )
    .exec();
  next();
});

module.exports = mongoose.model('purchases', PurchaseSchema);
