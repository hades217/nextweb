var express = require('express');
var keystone =require('./keystone');

app =module.exports = express();
app
.listen(8001);

console.log('Magic happens on port 8001');


app.get('/', function (req, res) {
	res.send('hello world the server running ');
});
