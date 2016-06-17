'use strict';

module.exports = function(grunt) {

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  grunt.initConfig({

    potato: appConfig,

    // Reference: https://github.com/gruntjs/grunt-contrib-jshint
    // Validate files with JSHint.
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: [
        '<%= potato.app %>/js/*.js',
      ]
    },
    
    // Reference: https://github.com/gruntjs/grunt-contrib-connect
    // Start a static web server
    connect: {
        options: {
          port: 9999,
          // Change this to '0.0.0.0' to access the server from outside.
          hostname: 'localhost'
        },
        app: {
          options: {
            open: true,
            base: '<%= potato.app %>'
          }
        },
        dist: {
          options: {
            open: true,
            base: '<%= potato.dist %>'
          }
        }
    },

    // Reference: https://github.com/gruntjs/grunt-contrib-compass
    // Compile Compass to CSS.
    compass: {
      dist: {
        options: {
          sassDir: '<%= potato.app %>/styles',
          cssDir: '<%= potato.app %>/styles'
        }
      }
    },

    // Reference: https://github.com/gruntjs/grunt-contrib-copy
    // Copy files and folders
    copy: {
      index: {
          files: [{
              cwd: '<%= potato.app %>/',
              src: 'index.html',
              dest: '<%= potato.dist %>/',
              expand: true
          }]
      },
      views: {
        files: [{
          cwd: '<%= potato.app %>/views/', 
          src: '*.html',
          dest: '<%= potato.dist %>/views/',
          expand: true
        }]
      }
    },

    // Reference: https://github.com/yeoman/grunt-usemin
    // Replaces references to non-optimized scripts or stylesheets into a set of HTML files
    useminPrepare: {
      html: '<%= potato.dist %>/index.html'
    },
    usemin: {
      html: ['<%= potato.dist %>/{,*/}*.html'],
      css: ['<%= potato.dist %>/styles/{,*/}*.css'],
      js: ['<%= potato.dist %>/js/{,*/}*.js'],
      options: {
        assetsDirs: [
          '<%= potato.dist %>',
          '<%= potato.dist %>/images',
          '<%= potato.dist %>/styles'
        ],
        patterns: {
          js: [[/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']]
        }
      }
    },

    // Reference: https://github.com/gruntjs/grunt-contrib-concat
    // Concatenate files into one
    concat: {
        generated: { //target
          files: [
            {
              src: [
                    '<%= potato.app %>/js/vendor/angular.js',
                    '<%= potato.app %>/js/vendor/angular-route.js',
                    '<%= potato.app %>/js/vendor/angular-sanitize.js',
                    '<%= potato.app %>/js/vendor/angular-resource.js',
                    '<%= potato.app %>/js/vendor/angular-animate.js',
                    '<%= potato.app %>/js/app.js',
                    '<%= potato.app %>/js/listingController.js',
                    '<%= potato.app %>/js/detailController.js',
              ],
                dest: '.tmp/js/app.js'
            }
          ]
        }
    },

    // Reference: https://github.com/gruntjs/grunt-contrib-uglify
    // Minify files with UglifyJS
    uglify: {
        generated: {
          // files: [
          //   {
          //     dest: '<%= potato.dist %>/js/app.min.js',
          //     src: [ '.tmp/js/app.js' ]
          //   }
          // ]
          files: {
            '<%= potato.dist %>/js/app.min.js': ['.tmp/js/app.js']
          }
        }
    },

    // Reference: https://github.com/gruntjs/grunt-contrib-cssmin
    // Compress CSS files
    cssmin: {
      css: {
        files: {
          '<%= potato.dist %>/styles/bootstrap.min.css': ['<%= potato.app %>/styles/bootstrap.css']
        }
      }
    },

    // Reference: https://github.com/gruntjs/grunt-contrib-clean
    // Clear files and folders.
    clean: {
      dist: ['<%= potato.dist %>/*'],
      tmp: ['.tmp']
    },

    // Reference: https://github.com/gruntjs/grunt-contrib-imagemin
    // Minify PNG and JPEG images
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: '<%= potato.app %>/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%= potato.dist %>/images/'
        }]
      }
    },

    // Reference: https://github.com/gruntjs/grunt-contrib-watch
    // Run tasks whenever watched files change
    watch: {
      js: {
        files: ['<%= potato.app %>/js/{,*/}*.js'],
        tasks: ['jshint']
      },
      compass: {
        files: ['<%= potato.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass']
      },
    }

  });
  
  // load task
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-copy');


  // register grunt tasks
  grunt.registerTask('serve', ['compass', 'connect:app', 'watch']);
  grunt.registerTask('prod', [
    'clean',
    'copy', 
    'imagemin', 
    'cssmin',
    'useminPrepare', 
    'concat', 
    'uglify',
    'usemin',
    'clean:tmp',
    'connect:dist:keepalive']
  );

};