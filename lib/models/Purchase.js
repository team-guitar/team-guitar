const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true
  }, 
  price: {
    type: Number,
    required: true
  },
  store: {
    type: mongoose.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  customer: {
    type: mongoose.Types.ObjectId,
    ref: 'Customer',
    required: true
  }
});

module.exports = mongoose.model('Purchase', purchaseSchema);
