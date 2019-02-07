const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  flavors: {
    type: Array,
    required: true
  },
  sizes: {
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
  },

});

module.exports = mongoose.model('Store', storeSchema);
