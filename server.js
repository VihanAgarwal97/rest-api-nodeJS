//BASIC SERVER

const http = require('http');
//Import our request handler
const app = require('./app');
//PORT at which nodeJS server will run
const port = process.env.PORT || 8000;
//Create a new server
const server = http.createServer(app);

//Start server on port
server.listen(port);
