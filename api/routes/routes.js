module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render('index');
	});
	app.get('/api', function(req, res) {
		res.send('<h1>Welcome to the meanjs-starter API!</h1>');
	});
};