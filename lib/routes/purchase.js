const { Router } = require('express');
const Purchase = require('../models/Purchase');
const { HttpError } = require('../middleware/error');
const { ensureAuth } = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const { flavor, size, price, store } = req.body;
    Purchase
      .create({
        flavor,
        size,
        price,
        store
      })
      .then(purchase => res.send(purchase))
      .catch(next);
  })
  .get('/:id', ensureAuth, (req, res, next) => {
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


  .get('/stats/revPerStore', ensureAuth, (req, res, next) => {
    Purchase
      .revPerStore()
      .then(data => res.send(data))
      .catch(next);
  })
  .get('/stats/revPerFranchise', ensureAuth, (req, res, next) => {
    Purchase
      .revPerFranchise()
      .then(data => res.send(data))
      .catch(next);
  })
  .get('/stats/top5flavors', ensureAuth, (req, res, next) => {
    Purchase
      .top5flavors()
      .then(data => res.send(data))
      .catch(next);
  }) 

  .get('/', ensureAuth, (req, res, next) => {
    Purchase
      .find()
      .then(purchases => {res.send(purchases);})
      .catch(next);
  });
