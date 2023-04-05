// dependencies
const fs = require('fs');
const path = require('path');

const lib = {};

// base directory of data folder
lib.basedir = path.join(__dirname, '/../.data/')

//write data to file
lib.create = function(dir,file,data, callback){
    //open file for writing
    fs.open(lib.basedir+dir+'/'+file+'.json', 'wx',function(err,fileDescriptor){
        if(!err && fileDescriptor){
            //convert data to string
            const stringData = JSON.stringify(data);
        }else{
            callback('couldnot create new file, it may already exists!')
        }
    })
}

