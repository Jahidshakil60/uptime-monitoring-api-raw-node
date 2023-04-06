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

//read data from file
lib.read = (dir,file, callback)=>{
    fs.readFile(`${lib.basedir+dir}/${file}.json`,'utf-8',(err,data)=>{
        callback(err,data)
    })
}

//update existing file
lib.update = (dir,file,data,callback)=>{
    // fill open for writing
    fs.open(`${lib.basedir+dir}/${file}.json`, 'r+',(err,fileDescriptor)=>{
        if(!err && fileDescriptor){
            //convert the data to string
            const stringData = JSON.stringify(data)

            //truncate the file or empty file
            fs.ftruncate(fileDescriptor,(err1)=>{
                if(!err1){
                    //write to file and close it
                    fs.writeFile(fileDescriptor, stringData, (err2)=>{
                        if (!err2) {
                            fs.close(fileDescriptor,(err3)=>{
                                if (!err3) {
                                    callback(false)
                                } else {
                                    callback('error closing file')
                                }
                            })
                        } else {
                            callback('error writing the file')
                        }
                    })
                }else{
                    callback('error truncating to file')
                }
            })
        }else{
            callback(`error updating.File may not exist`);
        }
    })
}

//delete existing file
lib.delete = (dir,file,callback)=>{
    fs.unlink(`${lib.basedir+dir}/${file}.json`,(err)=>{
        if(!err){
            callback(false)
        }else{
            callback('error while deleting the file')
        }
    })
}


module.exports = lib;

