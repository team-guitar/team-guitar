const mongoose = require('mongoose');
// const chance  = require('chance');

const purchaseSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true
  }, 
  price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Purchase', purchaseSchema);
