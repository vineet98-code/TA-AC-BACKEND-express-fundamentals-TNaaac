var express  = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var app = express();

// All middleware place ater the incoming request before sending a response

// custom logger 
// app.use((req, res, next) => {
//     console.log(req.method, res.url);
//     next();
// });

// morgan is third party middleware used as a logger in express application and used in development and production mode.
// Not a part of express modules so install it 
app.use(logger('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended : false}))

app.use(express.static(__dirname + '/public'));


// multiple request are coming after staics that why cookies middleware keep after statics
// For creating the cookies
app.use(cookieParser());
// created custom middleware to keep track of the count of time user has visited in our website by creating cookies 
app.use('/about', (req, res, next) => {
    
    res.cookie('username', 'abc');
    res.end('About Page');
    
    var count = req.cookies.count;
    if(count) { // if there is a count, it simply increment the count and send the new cookies 
        res.cookies("count", Number(count) + 1)
    } else { // if there is no cookies avaiable here simply create a cookies by adding a key called count and a value that ie 1

        res.cookies("count", 1);
    }

    console.log(req.cookies);
    next();
})


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.listen(4000, () => {
    console.log('server listening on port 4k');
});