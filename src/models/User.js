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
  purchasedTutorials: [{ type: mongoose.Types.ObjectId, ref: 'tutorials' }],
});

module.exports = mongoose.model('users', UserSchema);
