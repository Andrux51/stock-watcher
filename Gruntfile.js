module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
    
    
    , meta: {
      srcPath: 'client_src',
      distPath: 'public',
      sysName: 'meanjs'
    }
    
    , karma: {
      unit: {
        configFile: 'test/client/karma.conf.js'
        , singleRun: true
      }
    }
    
    , less: {
      dist: {
        files: {
          '<%= meta.distPath %>/styles/<%= meta.sysName %>.min.css': ['<%= meta.srcPath %>/assets/styles/**/*.less']
        }
        , options: {
          cleancss: true
        }
      }
    }
    
    , uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        preserveComments: false
      },
      dist: {
        files: {
          '<%= meta.distPath %>/scripts/<%= meta.sysName %>.min.js': ['<%= meta.srcPath %>/assets/scripts/<%= meta.sysName %>Cfg.js','<%= meta.srcPath %>/modules/**/*.js']
        }
      }
    }
    
    , copy: {
      dist: {
        files: [
          // {expand: true, cwd: '<%= meta.srcPath %>', src: '**', dest: '<%= meta.distPath %>/'}
          { expand: true, cwd: '<%= meta.srcPath %>/bower_components', src: '**', dest: '<%= meta.distPath %>/bower_components' }
          , { expand: true, cwd: '<%= meta.srcPath %>/assets/images', src: '**', dest: '<%= meta.distPath %>/images' }
          , { expand: true, cwd: '<%= meta.srcPath %>', src: 'modules/**/views/**', dest: '<%= meta.distPath %>' }
        ]
      }
    }
    
    , clean: {
      // clean out *entire* dist folder
      // all: ['<%= meta.distPath %>']
      // clean scripts and styles for distribution - everything else should stay
      dist: ['<%= meta.distPath %>/scripts','<%= meta.distPath %>/styles']
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
        files: 'test/client/unit/**/*.js'
        , tasks: ['karma']
        , options: {
          atBegin: true
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-karma');

  // Default task(s).
  grunt.registerTask('default', ['clean:dist', 'uglify', 'less', 'copy:dist']);
};
