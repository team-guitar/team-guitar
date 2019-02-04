const { Router } = require('express');
const Store = require('../models/Store');
const { HttpError } = require('../middleware/error');
// const { ensureAuth } = require('../middleware/ensureAuth');

module.exports = Router() 
  .post('/', (req, res, next) => {
    const { products, address } = req.body;
    Store
      .create({
        products,
        address
      })
      .then(store => res.send(store))
      .catch(next);
  });
