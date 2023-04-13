//
// Title:Token Handler
// Description:handler to handle token related routes
// Author: Jahid Hasan Shakil
// Date: 06/03/2023
//
//dependencies
const data = require("../../lib/data");
const { hash, parseJSON } = require("../../helpers/utilities");
const { createRandomString } = require("../../helpers/utilities");

// module scaffolding
const handler = {};

handler.tokenHandler = (requestProperties, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete"];
  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._token[requestProperties.method](requestProperties, callback);
  } else {
    callback(405);
  }
};

handler._token = {};

handler._token.get = (requestProperties, callback) => {
  //check the id if valid
  const id =
    typeof requestProperties.queryStringObject.id === "string" &&
    requestProperties.queryStringObject.id.trim().length === 20
      ? requestProperties.queryStringObject.id
      : false;

  if (id) {
    data.read("tokens", id, (err, tokenData) => {
      const token = { ...parseJSON(tokenData) };
      if (!err && token) {
        callback(200, token);
      } else {
        callback(404, {
          error: "Requested user was not found!",
        });
      }
    });
  } else {
    callback(404, {
      error: "Request user was not found !",
    });
  }
};

handler._token.post = (requestProperties, callback) => {
  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;

  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

  if (phone && password) {
    data.read("users", phone, (err1, userData) => {
      let hashedpassword = hash(password);
      if (hashedpassword === parseJSON(userData).password) {
        let tokenId = createRandomString(20);
        let expires = Date.now() + 60 * 60 * 1000;
        let tokenObject = {
          phone,
          id: tokenId,
          expires,
        };
        data.create("tokens", tokenId, tokenObject, (err2) => {
          if (!err2) {
            callback(200, tokenObject);
          } else {
            callback(500, {
              error: "there was a problem in the server side",
            });
          }
        });
      } else {
        callback(400, {
          error: "password is not valid",
        });
      }
    });
  } else {
    callback(400, {
      error: "You have a problem in your request",
    });
  }
};

handler._token.put = (requestProperties, callback) => {
  //check the id if valid
  const id =
    typeof requestProperties.body.id === "string" &&
    requestProperties.body.id.trim().length === 20
      ? requestProperties.body.id
      : false;
  const extend =
    typeof requestProperties.body.extend === "boolean" &&
    requestProperties.body.extend === true
      ? true
      : false;

      if(id && extend){
        data.read('tokens' , id,(err,tokenData)=>{
            let tokenObject = parseJSON(tokenData);
            if(tokenObject.expires > Date.now()){
                tokenObject.expires = Date.now() + 60*60*1000;
                //store the updated token
                data.update('tokens', id, tokenObject, (err1)=>{
                    if(!err1){
                        callback(200,{
                            message: 'expires is updated'
                        })
                    }else{
                        callback(400,{
                            error:'error'
                        })
                    }
                })
            }else{
                callback(400,{
                    error: 'Token already expires'
                })
            }
        })
      }else{
        callback(400,{
            error: 'there was aproblem in your request'
        })
      }
};

handler._token.delete = (requestProperties, callback) => {
    const id =
    typeof requestProperties.queryStringObject.id === "string" &&
    requestProperties.queryStringObject.id.trim().length === 20
      ? requestProperties.queryStringObject.id
      : false;

      if(id){
        data.read('tokens',id,(err, tokenData)=>{
          if(!err && tokenData){
            data.delete('tokens',id,(err1)=>{
              if(!err1){
                callback(200,{
                  "message":'token was  successfully deleted'
                })
              }else{
                callback(500,{
                  error:'There was a problem in your server side'
                })
              }
            })
          }else{
            callback(500,{
              error:'There was a problem in your server side'
            })
          }
        })
      }else{
        callback(400, {
          error: 'there was a problem in your request'
        })
      }
};

handler._token.verify = (id,phone,callback)=>{
   data.read('tokens', id , (err, tokenData)=>{
    if(!err && tokenData){
      if(parseJSON(tokenData).phone === phone && parseJSON(tokenData).expires > Date.now()){
        callback(true)
      }else{
        callback(false)
      }
    }else{
      callback(false)
    }
   })
}

module.exports = handler;
