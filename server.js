var express = require('express');
var app = express();
var fs = require('fs');
var routes = require('./api/routes/routes')(app, fs);

// TODO: this is where the base for CSS/JS files is... add variable to be set for deploy ('/public/')
app.use(express.static(process.cwd() + '/client_src/'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', process.cwd());
var server = app.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port %d', server.address().port);
});
