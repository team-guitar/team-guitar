const { Router } = require('express');
const User = require('../models/User');
const { HttpError } = require('../middleware/error');
const { ensureAuth } = require('../middleware/ensureAuth');

module.exports = Router() 
    .post('/', (req, res, next) => {
        
        
    })