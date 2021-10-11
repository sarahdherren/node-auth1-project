require('dotenv').config();

console.log(process.env.PORT);

const server = require('./api/server.js');

const port = process.env.PORT;

server.listen( port, () => {
  console.log(`server rocking out on port ${port}`);
});
