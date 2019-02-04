const express = require('express');
const app = express();

const connection = require('./middleware/connection');
const { handler } = require('./middleware/error');
const { bearerToken } = require('./middleware/ensureAuth');
const notFound = require('./middleware/notFound');
const store = require('./routes/store');
const purchase = require('./routes/purchase');

app.use(express.json());

app.use(bearerToken);
app.use('/auth', connection, require('./routes/auth'));

app.use('/store', store);
app.use('/purchase', purchase);

app.use(notFound);
app.use(handler);

module.exports = app;
