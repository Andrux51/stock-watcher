module.exports = function(app, fs) {
    // serve client website using node webserver, will be Angular single-page application (SPA)
    app.get('/', function(request, response) {
        response.render('public/index');
    });
    // probably will want to have the API docs live in the client to be more Angular-ready
    app.get('/api', function(request, response) {
        response.render('api/views/api');
    });
    // GET /api/test will serve a sample json file
    app.route('/api/test')
        .get(function(request, response) {
            fs.readFile('api/json/test.json', function(err, data) {
                response.json(JSON.parse(data));
            });
        });
};