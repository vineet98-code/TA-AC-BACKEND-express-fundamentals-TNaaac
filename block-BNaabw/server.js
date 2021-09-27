var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var app = express();

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended : false})) // used to capture the form data from user
app.use(express.static(__dirname + '/public'));


// route
// rendering the Html page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})
// Rendering the HTML form 
app.get('/new', (req, res) => {
    res.sendFile(__dirname + '/new.html');
})
// add a post request on '/new' route and display submitted form data
app.post('/new', (req, res) => {
    console.log(req.body);
    res.json(req.body);
})


// query string
app.get('/users', (req, res) => {
    console.log(req.query);
    res.json(req.query); // req.query is used to capture the query string. query string is not the path
})


app.get('/users/:username', (req, res) => {
    var username  = req.params.username;
    res.send(username);
})



app.listen(2000, () => {
    console.log('server listening on port 2k')
});