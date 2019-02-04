const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  products: {
    type: Array,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Store', storeSchema);
