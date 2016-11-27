module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  var connect = require('connect');
  var serveStatic = require('serve-static');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        atBegin: true
      }
    },
    jasmine: {
      dist: {
        src: 'src/*.js',
        options: {
          specs: 'test/*.unit.js',
          vendor: ['node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/angular-animate/angular-animate.min.js',
            'node_modules/angular-aria/angular-aria.min.js',
            'node_modules/angular-material/angular-material.min.js'
          ],
          summary: true
        }
      }
    }
  })

  grunt.registerTask('server', function () {
    connect()
      .use('/lib', serveStatic('node_modules'))
      .use('/', serveStatic('src'))
      .listen(8888);
  });

  grunt.registerTask('test', ['jasmine']);

  grunt.registerTask('run', ['server', 'watch'])
}
