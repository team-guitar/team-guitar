const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  purchaseHistory: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model('Customer', customerSchema);
