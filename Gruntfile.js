module.exports = function(grunt) {

    var pathBuild = 'build/<%= pkg.name + "." + pkg.version %>.js';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: '\n\n'
            },
            basic: {
                src: ['src/namespace.js','src/**/*.js'],
                dest: pathBuild
            },
            extra: {
                src: ['example-ui/**/*.js'],
                dest: 'build/ui.js'
            }
        },

        wrap: {
            basic: {
                src: pathBuild,
                dest: pathBuild,
                options: {
                    wrapper: ['!function () {\n', '\n window.CanvasEditor = APP; \n}();']
                }
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
    grunt.loadNpmTasks('grunt-wrap');

    grunt.registerTask('default', ['concat', 'wrap']);

    grunt.loadNpmTasks('grunt-jsdoc-to-markdown');
    grunt.registerTask('doc', 'jsdoc2md')

};