const { Router } = require('express');
const Store = require('../models/Store');
// const { HttpError } = require('../middleware/error');
// const { ensureAuth } = require('../middleware/ensureAuth');

module.exports = Router() 
  .post('/', (req, res, next) => {
    const { products, address, name } = req.body;
    Store
      .create({
        products,
        address,
        name
      })
      .then(store => res.send(store))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Store
      .find()
      .then(stores => {res.send(stores);})
      .catch(next);
  });
