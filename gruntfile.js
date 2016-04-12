module.exports = function (grunt) {
    grunt.initConfig({
        pkgFile: 'package.json',
        clean: ['build'],
        babel: {
            options: {
                sourceMap: false,
                plugins: ['object-assign'],
                optional: ['runtime']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: './',
                    src: ['./lib/*.js'],
                    dest: 'build',
                    ext: '.js'
                }]
            }
        },
        watch: {
            dist: {
                files: ['./lib/*.js'],
                tasks: ['babel:dist']
            }
        }
    })

    require('load-grunt-tasks')(grunt)
    grunt.registerTask('default', ['build'])
    grunt.registerTask('build', 'Build modern fetch', function () {
        grunt.task.run([
            'clean',
            'babel'
        ])
    })
}