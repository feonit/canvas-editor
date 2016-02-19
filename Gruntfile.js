module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: '\n\n'
            },
            basic: {
                src: ['src/**/*.js'],
                dest: 'build/<%= pkg.name + "." + pkg.version %>.js'
            },
            extra: {
                src: ['example/**/*.js'],
                dest: 'build/ui.js'
            }
        },

        jsdoc2md: {
            oneOutputFile: {
                src: 'src/ToolsDriver.js',
                dest: 'readme.md'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');


    grunt.registerTask('default', ['concat']);

    grunt.loadNpmTasks('grunt-jsdoc-to-markdown');
    grunt.registerTask('doc', 'jsdoc2md')

};