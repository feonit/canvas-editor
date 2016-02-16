module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: '\n\n'
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'build/<%= pkg.name + "." + pkg.version %>.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');


    grunt.registerTask('default', ['concat']);

}