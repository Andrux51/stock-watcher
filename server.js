var express = require('express');
var app = express();

var routes = require('./api/routes/routes')(app);

app.use(express.static(process.cwd() + '/public/'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', process.cwd() + '/public/');
var server = app.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port %d', server.address().port);
});