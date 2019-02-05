const { Router } = require('express');
const Purchase = require('../models/Purchase');
const { HttpError } = require('../middleware/error');

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
  })
  .get('/:id', (req, res, next) => {
    const id = req.params.id;
    Purchase
      .findById(id)
      .then(foundPurchase => {
        if(!foundPurchase) {
          return new HttpError(404, `No purchase found with id: ${id}`);
        }
        res.send(foundPurchase);
      })
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Purchase
      .find()
      .then(purchases => {res.send(purchases);})
      .catch(next);
  });
