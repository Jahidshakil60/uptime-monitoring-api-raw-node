//
// Title: server library
// Description: A Restful API to monitor up or down time of user defined links
// Author: Jahid Hasan Shakil
// Date: 04/03/2023
//

// dependencies
const http = require("http");
const { handleReqRes } = require("../helpers/handleReqRes");
const environment = require("../helpers/environments");


// server object - module scaffolding
const server = {};

// create server
server.createServer = () => {
  const createServerVariable = http.createServer(server.handleReqRes);
  createServerVariable.listen(environment.port, () => {
    console.log(`listening to port ${environment.port}`);
  });
};

// handle request response
server.handleReqRes = handleReqRes;

// start server
server.init = () => {
  server.createServer();
};

module.exports = server;
