module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
    
    , meta: {
      srcPath: 'client_src'
      , deployPath: 'public'
      , sysName: 'meanjs'
    }

    , clean: {
      // clean out *entire* dist folder *** DO NOT DO THIS!!! ***
      all: ['<%= meta.deployPath %>']
      // clean scripts and styles for distribution - everything else should stay
      , deploy: ['<%= meta.deployPath %>/scripts','<%= meta.deployPath %>/styles']
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
          // '<%= meta.deployPath %>/styles/<%= meta.sysName %>.min.css': ['<%= meta.srcPath %>/assets/styles/**/*.less']
          '<%= meta.srcPath %>/assets/styles/<%= meta.sysName %>.css': ['<%= meta.srcPath %>/assets/styles/**/*.less']
        }
      }
    }
    
    , copy: {
      deploy: {
        files: [
          { src: '<%= meta.srcPath %>/index.html', dest: '<%= meta.deployPath %>/index.html' }
          , { expand: true, cwd: '<%= meta.srcPath %>', src: 'modules/**/views/**', dest: '<%= meta.deployPath %>' }
          , { expand: true, cwd: '<%= meta.srcPath %>/assets', src: 'images/**', dest: '<%= meta.deployPath %>/assets' }
        ]
      }

      , old: {
        files: [
          { expand: true, cwd: '<%= meta.srcPath %>', src: 'modules/**/views/**', dest: '<%= meta.deployPath %>' }
        ]
      }
    }
    
    , karma: {
      unit: {
        configFile: 'test/client/karma.conf.js'
        , singleRun: true
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
        files: 'client_src/assets/styles/**/*.less'
        , tasks: ['less']
        , options: {
          atBegin: true
        }
      }
      , uglify: {
        files: [
            'client_src/assets/scripts/<%= meta.sysName %>Cfg.js'
            , 'client_src/modules/**/*.js'
          ]
          , tasks: ['uglify']
          , options: {
            atBegin: true
          }
      }
      , test_client: {
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
      // , dist: {
      //   files: {
      //     '<%= meta.deployPath %>/scripts/<%= meta.sysName %>.min.js': ['<%= meta.srcPath %>/assets/scripts/config.js','<%= meta.srcPath %>/assets/scripts/routes.js','<%= meta.srcPath %>/modules/**/*.js']
      //   }
      // }
    }

    , filerev: {
      files: {
        src: ['<%= meta.deployPath %>/scripts/<%= meta.sysName %>.min.js'
          , '<%= meta.deployPath %>/scripts/bower.min.js'
          , '<%= meta.deployPath %>/styles/<%= meta.sysName %>.min.css'
          , '<%= meta.deployPath %>/styles/bower.min.css']
      }
    }

    , usemin: {
      html: '<%= meta.deployPath %>/index.html'
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

  // grunt.registerTask('default', ['clean:deploy', 'uglify', 'less:dist', 'copy:deploy']);
  grunt.registerTask('default', ['clean:all', 'copy:deploy', 'useminPrepare', 'concat:generated', 'uglify:generated', 'concat:generated', 'cssmin:generated', 'filerev', 'usemin', 'clean:tmp']);
};
