const { Router } = require('express');
const Purchase = require('../models/Purchase');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { product, price, store } = req.body;
    Purchase
      .create({
        product,
        price,
        store
      })
      .then(purchase => res.send(purchase))
      .catch(next);
  });
