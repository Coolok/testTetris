module.exports = function(grunt) {

     grunt.initConfig({
	
	  concat: {
		options: {
		  separator: ';',
		},
		dist: {
		  src: [
			"cocos2d-js-v3.10.js",
			"main.js",
			"src/resource.js",
			"src/Tools/GameController.js",
			"src/Tools/Constants.js",
			"src/Tools/SoundsManager.js",
			"src/Tools/Settings.js",
			"src/Scenes/GameScene.js",
			"src/Layers/GameLayer.js",
			"src/Layers/Figure.js"
		  ],
		  
		  dest: 'built.js',
		},
	  },
	  
	  imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'res/',
					src: ['**/**/*.{png,jpg,gif}'],
					dest: 'images/build/'
				}]
			}
		},
		
	  uglify: {
			build: {
				src: 'built.js',
				dest: 'built.min.js',
			}
		},
		
		watch: {
			scripts: {
				files: ['*/*/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false,
				},
			}
		},
		
	});

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
	//grunt.loadNpmTasks('grunt-contrib-imagemin');
	//grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['concat', 'uglify'/*,'imagemin'*/]);

};