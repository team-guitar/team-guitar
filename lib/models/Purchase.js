const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  flavor: {
    type: String,
    required: true
  }, 
  size:{
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
// Revenue per store
purchaseSchema.statics.revPerStore = function() {
  return this.aggregate([{ $group: {
    _id: '$store',
    rev: {
      $sum: '$price'
    }
  } }, { $lookup: {
    from: 'stores',
    localField: '_id',
    foreignField: '_id',
    as: 'storeName'
  } }, { $unwind: {
    path: '$storeName'
  } }, { $project: {
    rev: true,
    name: '$storeName.name',
    address: '$storeName.address',
  } }, { $sort: {
    rev: -1
  } }]);
};

module.exports = mongoose.model('Purchase', purchaseSchema);
