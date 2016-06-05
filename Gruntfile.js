module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        // Configure a mochaTest task 
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    //captureFile: 'results.txt', // Optionally capture the reporter output to a file 
                    quiet: false, // Optionally suppress output to standard out (defaults to false) 
                    clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false) 
                },
                src: ['test/**/*Test.js']
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        ts: {
            default: {
                src: [
                    "./ts-app/**/*.ts"
                ],
                outDir: "public/app"
            },
            options: {
                fast: 'never',
                verbose: true,
                module: 'system',
                moduleResolution: 'node',
                experimentalDecorator: true,
                emitDecoratorMetadata: true,
                noImplicitAny: false,
                target: 'es5',
                failOnTypeErrors: false
            }
        }
    });


    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-karma');
    grunt.registerTask("angular2-compile", ["ts"]);
    grunt.registerTask('mocha-test', 'mochaTest');
    grunt.registerTask('karma-test', 'karma');
    grunt.registerTask('test-all', ['mochaTest', "karma"]);

};
