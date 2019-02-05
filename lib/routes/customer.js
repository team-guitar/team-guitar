const { Router } = require('express');
const Customer = require('../models/Customer');

module.exports = Router()
  .post('/', (req, res, next) =>{
    const { name } = req.body;
    Customer
      .create({
        name
      })
      .then(customer => res.send(customer))
      .catch(next);
  });
