var express = require('express');

var app = express();

// middleWare
app.use((req, res, next) => {
   console.log(req.method, req.url);
   next();
});

// add express.json middleware. inbullt middleware don't have to called next() function
app.use(express.json());

// Add express.urlencoded as middleware and to parse the form data
// extended uses to parse the single form or nested form 
// For simple form extended is false 
// For nested form extended is true
app.use(express.urlencoded({ extended: false}));



app.post('/json', (req, res) => {
    // capture the data
    console.log(req.body);
})

app.post('/contacts', (req, res) => {
    // capture the data
    console.log(req.body);
})

app.listen(2000, () => {
    console.log('server listening on 2k');
})