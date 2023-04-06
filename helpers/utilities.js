// 
// Title: Utilities 
// Description: Handle all utilities related things 
// Author: Jahid Hasan Shakil
// Date: 06/03/2023
// 

//dependencies
const crypto = require('crypto');
const environments = require('./environments')

// module scaffolding
const utilities = {};

//parsejson string to object
utilities.parseJSON = (jsonString)=>{
    let output ;
    try {
        output= JSON.parse(jsonString)
    } catch {
        output={}
    }
    return output;
}

//hash string
utilities.hash = (str)=>{
    if (typeof(str)==='string' && str.length>0){
        const hash = crypto
        .createHmac('sha256', environments.secretKey )
        .update(str)
        .digest('hex');
        return hash;
    }else{
        return false;
    }

}

module.exports = utilities;