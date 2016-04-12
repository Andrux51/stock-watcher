module.exports = function(app, bodyParser, fs, nodemailer) {
    var jsonParser = bodyParser.json();

    // serve client website using node webserver, will be Angular single-page application (SPA)
    app.get('/', function(request, response) {
        response.render('client_src/index');
    });
    // probably will want to have the API docs live in the client to be more Angular-ready
    app.get('/api', function(request, response) {
        response.render('api/views/api');
    });

    app.post('/sendmail', jsonParser, function(request, response) {
        var req = request.body;
        console.log(req);

        // var transporter = nodemailer.createTransport('smtps://andymartin51@gmail.com:iglninuvbjqccznr@smtp.gmail.com');
        var transporter = nodemailer.createTransport('smtps://andrux51twitch@gmail.com:aTm@f4rm@smtp.gmail.com');

        var mailOptions = {
            from: '"Markltin Stock Notifier" <andrux51twitch@gmail.com>',
            to: 'andymartin51@gmail.com',
            subject: req.subject,
            text: req.bodyhtml,
            html: req.bodyhtml
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if(error) {
                response.json({ msg: 'error', info: error });
            }
            response.json({ msg: 'success', info: info });
        });
    });

    // GET /api/test will serve a sample json file
    app.route('/api/test')
        .get(function(request, response) {
            fs.readFile('api/json/test.json', function(err, data) {
                response.json(JSON.parse(data));
            });
        });
};
