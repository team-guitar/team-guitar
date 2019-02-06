const { Router } = require('express');
const Store = require('../models/Store');
const { HttpError } = require('../middleware/error');
const { ensureAuth } = require('../middleware/ensureAuth');

module.exports = Router() 
  .post('/', ensureAuth, (req, res, next) => {
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
  .get('/:id', ensureAuth, (req, res, next) => {
    const id = req.params.id;
    Store
      .findById(id)
      .then(foundStore => {
        if(!foundStore) {
          return new HttpError(404, `No purchase found with id: ${id}`);
        }
        res.send(foundStore);
      })
      .catch(next);
  })
  .get('/', ensureAuth, (req, res, next) => {
    Store
      .find()
      .then(stores => {res.send(stores);})
      .catch(next);
  })
  .patch('/:id', ensureAuth, (req, res, next) => {
    const id = req.params.id;
    const { address } = req.body;
    Store 
      .findByIdAndUpdate(id, { address }, { new:true })
      .then(updated => {
        res.send(updated);
      })
      .catch(next);
  })
  .delete('/:id', ensureAuth, (req, res, next) => {
    const id = req.params.id;
    Store
      .findByIdAndDelete(id)
      .then(deleted => {
        res.send(deleted);
      })
      .catch(next);
  });
