const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  provider: {
    type: String,
    required: false,
  },
  providerId: {
    type: String,
    required: false,
  },
  creationDate: {
    type: Date,
    required: true,
  },
  purchases: [{ type: mongoose.Types.ObjectId, ref: 'purchases' }],
  verified: { type: Boolean, required: true, default: false },
  stripeConnectedAccountId: { type: String },
});

module.exports = mongoose.model('users', UserSchema);
