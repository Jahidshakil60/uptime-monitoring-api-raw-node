//
// Title: workers library
// Description: A Restful API to monitor up or down time of user defined links
// Author: Jahid Hasan Shakil
// Date: 04/03/2023
//

// dependencies
const url = require("url");
const http = require("http");
const https = require("https");
const data = require("./data");
const { parseJSON } = require("../helpers/utilities");

// app object - module scaffolding
const worker = {};

//lookup all the checks
worker.gatherAllChecks = () => {
  data.list("checks", (err, checks) => {
    if (!err && checks && checks.length > 0) {
      checks.forEach((check) => {
        //read the checkdata
        data.read("checks", check, (err1, originalCheckData) => {
          if (!err1 && originalCheckData) {
            //pass the data to the check validator
            worker.validateCheckData(parseJSON(originalCheckData));
          } else {
            console.log("error: reading one of the checks data!");
          }
        });
      });
    } else {
      console.log("error : could not find any checks to process!");
    }
  });
};

//validate individual heckdta
worker.validateCheckData = (originalCheckData) => {
  if (originalCheckData && originalCheckData.id) {
    originalCheckData.state =
      typeof originalCheckData.state === "string" &&
      ["up", "down"].indexOf(originalCheckData.state) > -1
        ? originalCheckData.state
        : "down";

    originalCheckData.lastChecked =
      typeof originalCheckData.lastChecked === "number" &&
      originalCheckData.lastChecked > 0
        ? originalCheckData.lastChecked
        : false;

    //pass to the next process
    worker.performCheck(originalCheckData);
  } else {
    console.log("error: check was invalid or not properly formatted!");
  }
};

//perform check
worker.performCheck = (originalCheckData) => {
  //prepare the initial check outcome
  let checkOutCome = {
    error: false,
    responseCode: false,
  };
  //mark the outcome has not been sent yet
  let outcomeSent = false;
  //parse the hostname & full url from original data
  const parseUrl = url.parse(
    originalCheckData.protocol + "://" + originalCheckData.url,
    true
  );
  const hostName = parseUrl.hostname;
  const path = parseUrl.path;

  //constract the request
  const requestDetails = {
    protocol: originalCheckData.protocol + ":",
    hostname: hostName,
    method: originalCheckData.method.toUpperCase(),
    path: path,
    timeout: originalCheckData.timeoutSeconds * 1000,
  };
  const protocolToUse = originalCheckData.protocol === "http" ? http : https;
  let req = protocolToUse.request(requestDetails, (res) => {
    //grab the status of the response
    const status = res.statusCode;

    //update the chack outcome and pass to next process
    checkOutCome.responseCode = status;
    if (!outcomeSent) {
      worker.processCheckoutcome(originalCheckData, checkOutCome);
      outcomeSent = true;
    }
  });

  req.on("error", (e) => {
    checkOutCome = {
      error: true,
      value: e,
    };

    if (!outcomeSent) {
      worker.processCheckoutcome(originalCheckData, checkOutCome);
      outcomeSent = true;
    }
  });

  req.on("timeout", () => {
    checkOutCome = {
      error: true,
      value: "timeout",
    };

    if (!outcomeSent) {
      worker.processCheckoutcome(originalCheckData, checkOutCome);
      outcomeSent = true;
    }
  });

  req.end();
};

worker.processCheckoutcome=(originalCheckData, checkOutCome)=>{
    //check if check outcome is up or down
    const state = !checkOutCome.error && checkOutCome.responseCode && originalCheckData.successCodes.indexOf(checkOutCome.responseCode)> -1 ? 'up' :'down';

    //decide whether we should alert the user or not
    const alertWanted = originalCheckData.lastChecked && originalCheckData.state !== state ? true : false;

    //update the checked data

    let newCheckData = originalCheckData;

    newCheckData.state = state;
    newCheckData.lastChecked = Date.now()

    //update the check to disk
    data.update('checks', newCheckData.id , newCheckData,(err)=>{
      if(!err){
         if(alertWanted){
          //send the checkdata to next process
          worker.alertUserToStatusChange(newCheckData)
         }else{

         }
      }else{
        console.log('Alert is not needed as there is no state checks!');
      }
    });
}
//timer to execute the worker process once per minute
worker.loop = () => {
  setInterval(() => {
    worker.gatherAllChecks();
  }, 1000 * 60);
};

// start the workers

worker.init = () => {
  //execute all the checks
  worker.gatherAllChecks();

  //call the loop so that checks continue
  worker.loop();
};

module.exports = worker;
