module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: { 
            development: {
                files: {
                    'dev/styles/main.css': 'src/styles/main.less' // primeiro o arquivo de saida dps o de origem
                }
            },
            production: {
                options: {
                    compress: true, //compressão +- parecido com oq o less/sass dava pra fazer com plugins
                },
                files: { // dist = distribuição
                    'dist/styles/main.min.css': 'src/styles/main.less' // um arquivo comprimido  do CSS
                }
            }
        },
        watch: {
            less: {
                files: ['src/styles/**/*.less'],// ** é para acessar qualquer pasta dentro de styles e o * qualquer arquivo dentro
                tasks: ['less:development']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },
        replace: {
            dev: { 
                options: { 
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',  
                            replacement: './styles/main.css'
                            // pq ele nao vai pra /dev/styles ? ele automaticamente vai ser enviado para a lá usando o ./
                        },
                        {
                            match: 'ENDERECO_DO_JS',  
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                }, 
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: { 
                options: { 
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',  
                            replacement: './styles/main.min.css'
                            // pq ele nao vai pra /dev/styles ? ele automaticamente vai ser enviado para a lá usando o ./
                        },
                        {
                            match: 'ENDERECO_DO_JS',  
                            replacement: './scripts/main.min.js'
                        }
                    ]
                }, 
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: { 
                    removeComments: true,
                    collapseWhitespace: true,
                },
                files: {
                    'prebuild/index.html': 'src/index.html'
                    /*
                    1 - minificacao
                    2 - substituicao 
                    */
                }
            }
        },
        clean: ['prebuild'],
        uglify: {  
            target: {
                files: { 
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            }
        }
    })


/*        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: { //arquivo de destino e origem 
                    'main2.css': 'main.scss'
                }
            }
        },
        concurrent: {
            target: ['olaGrunt', 'less', 'sass', 'tarefaDemorada']
        }
    })

        grunt.registerTask('olaGrunt', function() {
            const done = this.async();
            setTimeout(function () {
                console.log('Olá Grunt');
                done();
            }, 4500)
        })

        grunt.registerTask('tarefaDemorada', function() {
            const done = this.async();
            setTimeout(function () {
                console.log('Olá Grunt');
                done();
            }, 6000)
        })
*/
        grunt.loadNpmTasks('grunt-contrib-less');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-replace');
        grunt.loadNpmTasks('grunt-contrib-htmlmin');
        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-contrib-uglify');


        grunt.registerTask('default', ['watch']); 
        grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify']); 

}