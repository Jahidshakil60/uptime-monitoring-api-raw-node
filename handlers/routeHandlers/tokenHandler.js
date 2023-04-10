//
// Title:Token Handler
// Description:handler to handle token related routes
// Author: Jahid Hasan Shakil
// Date: 06/03/2023
//
//dependencies
const data = require("../../lib/data");
// const { hash, parseJSON } = require("../../helpers/utilities");

// module scaffolding
const handler = {};

handler.tokenHandler = (requestProperties, callback)=>{
    const acceptedMethods = ['get','post','put','delete'];
    if(acceptedMethods.indexOf(requestProperties.method)>-1){
        handler._token[requestProperties.method](requestProperties,callback);
    }else{
        callback(405);
    }
}

handler._token = {};

handler._token.get = (requestProperties,callback)=>{};

handler._token.post = (requestProperties,callback)=>{};

handler._token.put = (requestProperties,callback)=>{};

handler._token.delete = (requestProperties,callback)=>{};