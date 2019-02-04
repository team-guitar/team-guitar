require('dotenv').config();
require('./lib/utils/connect')();

const app = require('./lib/app');

const PORT = 27017 || process.env.PORT;





app.listen(27017, () => console.log(`Listening on ${PORT}`));
