// 
// Title: Uptime Monitoring Application
// Description: A Restful API to monitor up or down time of user defined links
// Author: Jahid Hasan Shakil
// Date: 04/03/2023
// 

// dependencies
const http = require('http');
const {handleReqRes} = require('./helpers/handleReqRes');

// app object - module scaffolding
const app = {};

// configuration
app.config = {
    port: 8000,
};

// create server
app.createServer = ()=>{
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port,()=>{
        console.log(`listening to port ${app.config.port}`);
    })
}

// handle request response
app.handleReqRes= handleReqRes;

// start server
app.createServer();
