// 
// Title: Uptime Monitoring Application
// Description: A Restful API to monitor up or down time of user defined links
// Author: Jahid Hasan Shakil
// Date: 04/03/2023
// 

// dependencies
const http = require('http');
const {handleReqRes} = require('./helpers/handleReqRes');
const environment = require('./helpers/environments')

// app object - module scaffolding
const app = {};


// create server
app.createServer = ()=>{
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port,()=>{
        console.log(`listening to port ${environment.port}`);
    })
}

// handle request response
app.handleReqRes= handleReqRes;

// start server
app.createServer();
