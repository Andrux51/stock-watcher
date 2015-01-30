module.exports = function(app, fs) {
	app.get('/', function(req, res) {
		res.render('public/index');
	});
	app.get('/api', function(req, res) {
		res.render('api/views/api');
	});
	app.route('/api/test')
		.get(function(req, res) {
			fs.readFile('api/json/testjson.json', function(err, data) {
				res.json(JSON.parse(data));
			});
		});
};