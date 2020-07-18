const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, ref: 'users' },
  tutorialId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'tutorials',
  },
  price: { type: Number, required: true },
  purchaseDate: { type: Date, required: true },
});

module.exports = mongoose.model('purchases', PurchaseSchema);
