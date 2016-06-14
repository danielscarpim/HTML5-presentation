/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },

    jshint: {
      all: [
            'Gruntfile.js',
            'js/main.js', '!js/{,*/}*.min.js'
        ]
    },

    qunit: {
      files: ['test/**/*.html']
    },

    compass: {
        dist: {
            options: {
                importPath: "scss",
                sassDir: 'scss',
                cssDir: 'css',
                imagesPath: 'images',
                generatedImagesDir: 'images',
                relativeAssets: true,
                environment: 'development',
                outputStyle: 'nested',
                //require: 'bootstrap-sass'
            }
        }
    },

    watch: {
      files: [
            '*.html',
            'scss/{,*/}*.scss',
            'js/{,*/}*.js'
        ],
        tasks: [
            'compass',
            'jshint',
        ],
        options: {
          spawn: false,
          livereload: true
        },
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');

  // Default task.
  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

};
