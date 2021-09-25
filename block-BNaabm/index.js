var express = require('express');

var app = express();

app.use('/', (req,res, next) => {
    console.log(req.method, req.url);
    next();
})

app.get('/', (req, res) => {
    res.send('hey, How are you?');
})

app.listen(1000, () => {
    console.log('server is listening on port 1k');
})
  

