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
// Revenue by franchise name 
purchaseSchema.statics.revPerFranchise = function() {
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
  } }, { $group: {
    _id: { id: '$_id',
      name: '$storeName.name' },
    franchiseRevenue: {
      $sum: '$rev'
    }
  } }, { $project: {
    franchiseRevenue: true,
    name: true
  } }, { $sort: {
    franchiseRevenue: -1
  } }]);
  
};
//Top 5 most purchased flavors of all history ever 
//purchaseSchema.statics.revPerFranchise = function() {
purchaseSchema.statics.top5flavors = function() {  
  return this.aggregate([{ $group: {
    _id: '$flavor',
    count: {
      $sum: 1
    }
  } }, { $sort: {
    count:-1
  } }, { $limit: 5 }]);
};

module.exports = mongoose.model('Purchase', purchaseSchema);
