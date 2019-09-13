const express = require('express');//Node.js web application framework
const cors = require('cors');//Cross-origin resource sharing module
const fs = require('fs');//Node.js built in file stream module
const util = require('util');//Promise module

const app = express();
const port = 3001;
const readdir = util.promisify(fs.readdir);
const dirPath = '../load-pdf-gif/v01/src/media/pdf';

/*function readFiles(dirToRead, onFileContent, onError){
  fs.readdir(dirToRead, function(err, filenames){
    if(err){
      onError(err);
      return;
    }

    filenames.forEach(function(filename){
      fs.readFile(dirToRead + filename, 'utf-8', function(err, content){
        if(err){
          onError(err);
          return;
        }
        onFileContent(filename, content);
      });
    });
  });
}*/

//Function to read directory and return a list of filename
async function readFiles(dirToRead, fileExt){
  let re = new RegExp(fileExt, 'g');
  let fileArr = await readdir(dirToRead);//Full file array
  let fileArrNew = [];//Specify file array which is filter by fileExt
  //console.log('readFiles done: ' + JSON.stringify(fileArr));
  fileArr.forEach((file, index) => {
    if(file.match(re)){
      fileArrNew.push(file);
    }
  });
  return fileArrNew;
}

/*app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});*/

app.use(cors());

//app.get('/', (req, res) => res.send('Hello World!'));
app.get('/get-file-listing', (req, res, next) => {
  try{
    let files = readFiles(dirPath, '.pdf');
    console.log('reading files from: ' + dirPath);

    files.then(function(result){
      //Here you can use the result of promise
      console.log('read done');
      console.log('result: ' + JSON.stringify(result));
      console.log('result.length: ' + result.length);
      //console.log(result[0]);
      //console.log(Array.from(result));

      /*res.set({
        'Content-Type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      }).end(JSON.stringify(result));*/
      res.end(JSON.stringify(result));
    });
    //res.send(JSON.stringify(['aaa', 'bbb']));
  }catch(e){
    console.log('get-file-listing error: ' + JSON.stringify(e));
  }
});

app.post('/', (req, res, next) => {
  res.send('Hello World!');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));