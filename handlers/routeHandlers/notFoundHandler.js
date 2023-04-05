// 
// Title: Not Found Handler 
// Description:404 Not Found Handler 
// Author: Jahid Hasan Shakil
// Date: 05/03/2023
// 

// module scaffolding
const handler = {};

handler.notFoundHandler = (requestProperties,callback)=>{
    console.log('not found');
    callback(404,{
        message: 'Your request URL was not found',
    });
};

module.exports = handler;