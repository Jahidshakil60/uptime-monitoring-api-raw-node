// dependencies
const fs = require('fs');
const path = require('path');

const lib = {};

// base directory of data folder
lib.basedir = path.join(__dirname, '/../.data/')

//write data to file
lib.create = function(dir,file,data, callback){
    //open file for writing
    fs.open(`${lib.basedir+dir}/${file}.json`, 'wx' ,function(err,fileDescriptor){
        if(!err && fileDescriptor){
            //convert data to string
            const stringData = JSON.stringify(data);

            //write data to file and then close it
            fs.writeFile(fileDescriptor,stringData, (err2)=>{
                if(!err2){
                    fs.close(fileDescriptor,(err3)=>{
                        if(!err3){
                            callback(false)
                        }else{
                            callback('error closing the new file')
                        }
                    })
                }else{
                    callback('error writing to new file')
                }
            })
        }else{
            callback('couldnot create new file, it may already exists!')
        }
    })
}

