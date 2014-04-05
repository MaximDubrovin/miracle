'use strict';

module.exports = function(grunt) {

    /* faster and cleaner way to load npm tasks */
    require('jit-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/*\n <%= pkg.name %> <%= pkg.version %>, <%= grunt.template.today("dd.mm.yy HH:MM") %>\n © <%= grunt.template.today("yyyy") %>, Maxim Dubrovin,  License — https://github.com/MaximDubrovin/miracle/blob/dev/LICENSE-MIT.md \n*/\n',
            html: [
                '../sandbox/test.html',
                '../sandbox/e/**/*.html'
            ],
            sass: ['../sandbox/css/scss/base.scss'],
            js: [
                '../sandbox/js/base.js',
                '../sandbox/js/init.js',
                '../sandbox/js/getProps.js',
                '../sandbox/js/findImgs.js',
                '../sandbox/js/bindImgs.js',
                '../sandbox/js/showMiracle.js',
                '../sandbox/js/buildRule.js',
                '../sandbox/js/MSpinner.js',
                '../sandbox/js/createStyleElem.js',
                '../sandbox/js/defineSelectors.js',
                '../sandbox/js/getUniqueName.js',
                '../sandbox/js/markAsShown.js',
                '../sandbox/js/parseBgImgUrls.js',
                '../sandbox/js/domready.js'
            ]
        },
        watch: {
            options: {
                livereload: true
            },
            js: {
                files: '<%= meta.js %>',
                tasks: ['concat:js','uglify:js']
            },
            styles: {
                files: '<%= meta.sass %>',
                tasks: ['sass:base','autoprefixer:base','csso:compress']
            },
            html: {
                files: '<%= meta.html %>',
                tasks: ['copy:html']
            }
        },
        concat: {
            js: {
                files: {
                    '../miracle.js': '<%= meta.js %>',
                    '../build/js/miracle.js': '<%= meta.js %>'
                },
                options: {
                    banner: '<%= meta.banner %>'
                }
            }
        },
        uglify: {
            js: {
                files: {
                    '../miracle.min.js': ['../miracle.js'],
                    '../build/js/miracle.min.js': ['../miracle.js']
                },
                options: {
                    banner: '<%= meta.banner %>',
                    report: 'gzip'
                }
            }
        },
        sass: {
            base: {
                files: {
                    '../sandbox/css/base.css': '../sandbox/css/scss/base.scss',
                    '../build/css/base.css': '../sandbox/css/scss/base.scss'
                },
                options: {
                    banner: '<%= meta.banner %>',
                    style: 'nested'
                }
            }
        },
        autoprefixer: {
            base: {
                options: {
                    browsers: ['last 2 version']
                },
                files: {
                    '../sandbox/css/base.css': '../sandbox/css/base.css',
                    '../build/css/base.css': '../build/css/base.css'
                }
            }
        },
        csso : {
            base: {
                options: {
                    banner: '<%= meta.banner %>',
                    report: 'gzip'
                },
                files: {
                    '../sandbox/css/base.min.css': '../sandbox/css/base.css',
                    '../build/css/base.min.css': '../build/css/base.css'
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: '../sandbox/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '../build/img/'
                }]
            }
        },
        copy: {
            js_libs: {
                files: [
                    {
                        expand: true,
                        flatten: false,
                        cwd: '../sandbox/js/libs/',
                        src: '**',
                        dest: '../build/js/libs/'
                    }
                ]
            },
            html: {
                files: [
                    {
                        expand: true,
                        flatten: false,
                        cwd: '../sandbox/',
                        src: '**/*.html',
                        dest: '../build/'
                    }
                ]
            }
        },
        compress: {
            min: {
                options: {
                    archive: '../miracle-<%= pkg.version %>-min.zip'
                },
                files: [
                    {
                        expand: true,
                        cwd: '../',
                        src: 'miracle.min.js',
                        dest: 'miracle-<%= pkg.version %>-min/'
                    }
                ]
            },
            uncompressed: {
                options: {
                    archive: '../miracle-<%= pkg.version %>-uncompressed.zip'
                },
                files: [
                    {
                        expand: true,
                        cwd: '../',
                        src: 'miracle.js',
                        dest: 'miracle-<%= pkg.version %>-uncompressed/'
                    }
                ]
            }
        },
        connect: {
            server: {
                options: {
                    base: '../build',
                    hostname: '*',
                    port: 9001,
                    keepalive: true,
                    livereload: true
                }
            }
        }
    });

    grunt.registerTask('run-server',['connect']);

    grunt.registerTask('build-plugin',['concat:js','uglify:js']);

    grunt.registerTask('build-webpages',['sass','autoprefixer','csso','copy:html','copy:js_libs','imagemin']);

    grunt.registerTask('build-release',['compress:min']);

    grunt.registerTask('default',['watch']);
}