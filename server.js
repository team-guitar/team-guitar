require('dotenv').config();
require('./lib/utils/connect')();

const app = require('./lib/app');

const PORT = 2000 || process.env.PORT;





app.listen(2000, () => console.log(`Listening on ${PORT}`));
