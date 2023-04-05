// 
// Title: Uptime Monitoring Application
// Description: A Restful API to monitor up or down time of user defined links
// Author: Jahid Hasan Shakil
// Date: 04/03/2023
// 

// dependencies
const http = require('http');
const url = require('url');
const {StringDecoder} = require('string_decoder')

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
app.handleReqRes=(req,res)=>{
    // handle req
    // get the url and parsed it
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObject = req.header;
    
    const decoder = new StringDecoder('utf-8');
    let realData = '';

    req.on('data', (buffer)=>{
        realData += decoder.write(buffer)
    })

    req.on('end',()=>{
        realData += decoder.end();
        console.log(realData);

        // handle Response
        res.end('hello programers');
    })


};

// start server
app.createServer();
