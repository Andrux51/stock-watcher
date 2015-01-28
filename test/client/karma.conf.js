module.exports = function(config) {
  config.set({
    basePath: '../../'

    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    , frameworks: ['jasmine']

    , files: [
      // load needed bower components
      'public/bower_components/jquery/dist/jquery.js'
      , 'public/bower_components/angular/angular.js'
      , 'public/bower_components/angular-resource/angular-resource.js'
      , 'public/bower_components/angular-route/angular-route.js'
      , 'public/bower_components/angular-mocks/angular-mocks.js'
      
      // load source files
      , 'public/scripts/meanjs.min.js'

      // load test fixture JSON files
      , 'test/client/fixtures/*.json'

      // load unit test files
      , 'test/client/unit/**/*.js'
    ]

    // list of files to exclude
    , exclude: [
    ]

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    , preprocessors: {
      'client_src/modules/**/*.js': ['coverage']
      , 'test/client/fixtures/*.json': ['json_fixtures']
    }

    , jsonFixturesPreprocessor: {
      // strip this from the file path \ fixture name
      stripPrefix: 'test/client/fixtures/'
      // strip this to the file path \ fixture name
      , prependPrefix: ''
      // change the global fixtures variable name
      , variableName: 'jsonMocks'
    }

    , coverageReporter: {
      dir: 'test/client/coverage'
      , reporters: [
        { type: 'html', subdir: 'report-html' }
        , { type: 'text', subdir: '.', file: 'text.txt' }
        , { type: 'text-summary', subdir: '.', file: 'text-summary.txt' }
      ]
    }

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    , reporters: ['progress', 'coverage']

    // web server port
    , port: 9876

    // enable / disable colors in the output (reporters and logs)
    , colors: true

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    , logLevel: config.LOG_INFO

    // enable / disable watching file and executing tests whenever any file changes
    , autoWatch: true

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    , browsers: ['PhantomJS']

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    , singleRun: false
  });
};
