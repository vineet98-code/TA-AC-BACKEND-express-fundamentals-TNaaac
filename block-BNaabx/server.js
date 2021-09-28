var express = require('express');

var app = express();



function logger(req, res, next) {
    let time = new Date().toLocaleTimeString().split(' ')[0];
    console.log(req.method, req.url, time);
    next();
  }
  
  function processJson(req, res, next) {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      console.log(data);
    });
    req.on('end', () => {
      let parsedData = JSON.parse(data);
      // console.log(parsedData);
  
      req.body = parsedData;
      next();
    });
  }
  
  function processStaticFiles(req, res, next) {
    let filePath = __dirname + '/public' + req.url;
    res.sendFile(filePath);
    next();
  }
  
  app.use(logger);
  app.use(processJson);
  app.use(processStaticFiles);
  
  app.post('/json', (req, res) => {
    res.json(req.body);
  });

app.listen(2000, () => {
    console.log(`server listening on port 2k`);
})