module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
        
        // arbitrary variables for use across gruntfile
        , meta: {
            srcPath: 'client_src'
            , deployPath: 'public'
            , sysName: 'meanjs'
        }

        , copy: {
            deploy: {
                files: [
                    { src: '<%= meta.srcPath %>/index.html', dest: '<%= meta.deployPath %>/index.html' }
                    , { expand: true, cwd: '<%= meta.srcPath %>', src: 'modules/**/views/**', dest: '<%= meta.deployPath %>' }
                    , { expand: true, cwd: '<%= meta.srcPath %>', src: 'images/**', dest: '<%= meta.deployPath %>' }
                ]
            }
        }

        , clean: {
            all: ['<%= meta.deployPath %>']
            , tmp: ['.tmp']
        }

        , less: {
            dist: {
                options: {
                    plugins: [
                        new (require('less-plugin-autoprefix'))
                        , new (require('less-plugin-clean-css'))
                    ]
                }
                , files: {
                    '<%= meta.srcPath %>/styles/<%= meta.sysName %>.css': ['<%= meta.srcPath %>/styles/**/*.less']
                }
            }
        }
        
        , useminPrepare: {
            html: '<%= meta.srcPath %>/index.html'
            , options: {
                dest: '<%= meta.deployPath %>'
                , staging: '.tmp'
            }
        }

        , concat: {
            options: {
                banner: '/*! <%= pkg.name %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                , separator: ';'
            }
        }

        , uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                , preserveComments: false
            }
        }

        , filerev: {
            files: {
                src: [
                    '<%= meta.deployPath %>/scripts/<%= meta.sysName %>.min.js'
                    , '<%= meta.deployPath %>/scripts/bower.min.js'
                    , '<%= meta.deployPath %>/styles/<%= meta.sysName %>.min.css'
                    , '<%= meta.deployPath %>/styles/bower.min.css'
                ]
            }
        }

        , usemin: {
            html: '<%= meta.deployPath %>/index.html'
        }
        
        , karma: {
            unit: {
                configFile: 'test/client/karma.conf.js'
                , singleRun: true
            }
        }

        , mochacov: {
            options: {
              coveralls: true
              , instrument: false
              , files: 'test/api/**/*.js'
            }
        }

        
        , watch: {
            configFiles: {
                files: [ 'Gruntfile.js', 'test/client/karma.conf.js' ]
                , options: {
                    reload: true
                }
            }
            , less: {
                files: 'client_src/styles/**/*.less'
                , tasks: ['less']
                , options: {
                    atBegin: true
                }
            }
            , test: {
                files: [
                    'test/client/unit/**/*.js'
                    , 'test/client/fixtures/*.json'
                ]
                , tasks: ['karma']
                , options: {
                    atBegin: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-karma');

    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-mocha-cov');

    grunt.registerTask('default', ['less', 'deploy']);
    grunt.registerTask('deploy', ['clean:all', 'copy:deploy', 'useminPrepare', 'concat:generated', 'uglify:generated', 'concat:generated', 'cssmin:generated', 'filerev', 'usemin', 'clean:tmp']);
};
