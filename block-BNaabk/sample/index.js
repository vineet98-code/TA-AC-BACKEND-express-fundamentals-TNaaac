var express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.send('hey');
})
app.get('/about', (req, res) => {
    res.send('About Page');
})

app.listen(3000, () => {
    console.log('server is listening on port 3k');
})