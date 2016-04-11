var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var routes = require('./api/routes/routes')(app, bodyParser, fs, nodemailer);

// TODO: this is where the base for CSS/JS files is... add variable to be set for deploy ('/public/')
app.use(express.static(process.cwd() + '/client_src/'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', process.cwd());
var server = app.listen(process.env.PORT || 3000, function() {
    console.log('Yo, it\'s port %d', server.address().port);
});
