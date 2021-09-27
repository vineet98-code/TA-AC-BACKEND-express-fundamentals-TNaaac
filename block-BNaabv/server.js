var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var app = express();

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })) // used to capture the form data from user
app.use(express.static(__dirname + '/public'));

// custom middleware
// Whenever we passed next with err it skips all the miiddleware in the line and directly move to the error handler
app.use((req, res, next) => {
    // if requested url is /admin throw error
    if (req.url === "/admin") {
        return next("Unauthorized to access");
    }
    // other let it pass to next middleware by simply calling next()
    next();
});


app.get('/', (req, res) => {
    res.send(`<h2>Welcome to express</h2>`);
})

app.get('/about', (req, res) => {
    res.send('My name is qwerty');
})

// 404 handler
// Once the request has check all the router and not able find then only it should move to error handler middleware
app.use((req, res, next) => {
    res.send('Page not found');
})

// custom  Error handler middleware
// a 500 handler for client/server error
app.use((err, req, res, next) => {
    res.status(500).send(err);
})

app.post('/form', (req, res) => {
        res.end();
})

app.post('/json', (req, res) => {
        res.end();
})


// // Rendering the HTML form 
// app.get('/new', (req, res) => {
//     res.sendFile(__dirname + '/new.html');
// })
// // add a post request on '/new' route and display submitted form data
// app.post('/new', (req, res) => {
//     console.log(req.body);
//     res.json(req.body);
// })


// query string
// app.get('/users', (req, res) => {
//     console.log(req.query);
//     res.json(req.query); // req.query is used to capture the query string. query string is not the path
// })


// a router to capture params from the request on a route `/users/:username` using GET request.
// - capture the username and respond with username in HTML response.
app.get('/users/:username', (req, res) => {
    var username  = req.params.username;
    res.send(username);
})


app.listen(3000, () => {
    console.log('server listening on port 3k')
});

