const { Router } = require('express');
const Customer = require('../models/Customer');
const { HttpError } = require('../middleware/error');

module.exports = Router()
  .post('/', (req, res, next) =>{
    const { name } = req.body;
    Customer
      .create({
        name
      })
      .then(customer => res.send(customer))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    const _id = req.params.id;
    Customer
      .findById(_id)
      .select('-__v')
      .then(foundCustomer => {
        if(!foundCustomer) {
          return next(new HttpError(404, `No user found with id ${_id}`));
        }
        res.send(foundCustomer);
      })
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Customer
      .find()
      .then(customers => {res.send(customers);})
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    const id = req.params.id;
    const { name } = req.body;
    Customer
      .findByIdAndUpdate(id, { name }, { new: true })
      .then(updated => {
        res.send(updated);
      })
      .catch(next);
  });
  
