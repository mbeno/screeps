module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: 'mbenonisen@gmail.com',
                password: 'gjm5Ua,R',
                branch: 'git',
                ptr: false
            },
            dist: {
                src: ['dist/*.js']
            }
        }
    });
}
