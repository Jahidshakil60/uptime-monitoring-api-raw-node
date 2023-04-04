// 
// Title: Uptime Monitoring Application
// Description: A Restful API to monitor up or down time of user defined links
// Author: Jahid Hasan Shakil
// Date: 04/03/2023
// 

// dependencies
const http = require('http');
const url = require('url');

// app object - module scaffolding
const app = {};

// configuration
app.config = {
    port: 3000,
};

// create server
app.createServer = ()=>{
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port,()=>{
        console.log(`listening to port ${app.config.port}`);
    })
}

// handle request response
app.handleReqRes=(req,res)=>{
    // handle req
    // get the url and parsed it
    const parsedUrl = url.parse(req.url, true)
    const path = parsedUrl.pathname
    const trimmedPath = path.replace()

    // handle Response
    res.end('hello programers');
};

// start server
app.createServer();
