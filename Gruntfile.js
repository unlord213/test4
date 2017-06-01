module.exports = function (grunt) {
	require('time-grunt')(grunt);

	// Pull defaults (including username and password) from .screeps.json
	const config = require('./.screeps.json');

	// Allow grunt options to override default configuration
	const branch = grunt.option('branch') || config.branch;
	const email = grunt.option('email') || config.email;
	const password = grunt.option('password') || config.password;
	const ptr = grunt.option('ptr') ? true : config.ptr;
	const private_directory = grunt.option('private_directory') || config.private_directory;

	const version = require('./version.json').version + 1;

	grunt.log.subhead('Task Start: ' + new Date().toLocaleString());
	grunt.log.writeln('Branch: ' + branch);

	// Load needed tasks
	grunt.loadNpmTasks('grunt-jsbeautifier');
	grunt.loadNpmTasks('grunt-rsync');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-file-append');
	grunt.loadNpmTasks('grunt-mocha-istanbul');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-regex-replace');
	grunt.loadNpmTasks('grunt-screeps');

	grunt.initConfig({
		// Push all files in the dist folder to screeps. What is in the dist folder
		// and gets sent will depend on the tasks used.
		screeps: {
			options: {
				email: email,
				password: password,
				branch: branch,
				ptr: ptr
			},
			dist: {
				src: ['dist/*.js']
			}
		},

		// Copy all source files into the dist folder, flattening the folder
		// structure by converting path delimiters to underscores
		copy: {
			// Pushes the game code to the dist folder so it can be modified before
			// being send to the screeps server.
			screeps: {
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['**'],
					dest: ['dist/'],
					filter: 'isFile',
					rename: function (dest, src) {
						// Change the path name utilize underscores for folders
						return dest + src.replace(/\//g, '_');
					},
				}],
				options: {
					process: function (content) {
						return content.replace(/\.\.\//g, '').replace(/\.\//g, '').replace(/([^*<\/\s])\/(?!\*)/g, '$1_');
					},
				}
			}
		},

		// Copy files to the folder the client uses to sink to the private server.
		// Use rsync so the client only uploads the changed files.
		rsync: {
			options: {
				args: ['--verbose', '--checksum'],
				exclude: ['.git*'],
				recursive: true
			},
			private: {
				options: {
					src: './dist/',
					dest: private_directory,
				}
			}
		},

		// Add version variable using current timestamp.
		file_append: {
			versioning: {
				files: [
					{
						append: 'global.SCRIPT_VERSION = ' + version + ';\n',
						input: './src/version.js',
						output: './dist/version.js',
					},
					{
						append: '{"version":' + version + '}' + '\n',
						input: './src/version.js',
						output: './version.json',
					}
				]
			}
		},

		// Remove all files from the dist folder.
		clean: {
			'dist': ['dist']
		},

		// Apply code styling
		jsbeautifier: {
			modify: {
				src: ['src/**/*.js'],
				options: {
					config: '.jsbeautifyrc'
				}
			},
			verify: {
				src: ['src/**/*.js'],
				options: {
					mode: 'VERIFY_ONLY',
					config: '.jsbeautifyrc'
				}
			}
		},

		mochaTest: {
			test: {
				options: {
					reporter: 'min',
					clearRequireCache: true
				},
				src: ['test/**/*.spec.js']
			}
		},

		watch: {
			js: {
				options: {
					spawn: true,
					interrupt: true,
					debounceDelay: 250
				},
				files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js', '!test/screepsAutocomplete.js'],
				tasks: ['mochaTest']
			}
		},

		mocha_istanbul: {
			coverage: {
				src: ['test/**/*.spec.js'],
				options: {
					mask: '*.spec.js'
				}
			}
		},

		uglify: {
			options: {
				mangle: false,
				beautify: true,
				compress: false
			},
			my_target: {
				files: {
					'test/screepsAutocomplete.js': ['ScreepsAutocomplete/**/*.js']
				}
			}
		},

		'regex-replace': {
			replace: {
				src: ['test/screepsAutocomplete.js'],
				actions: [
					{
						search: '(.*) = function',
						replace: 'global.$1 = function',
						flags: 'g'
					},
					{
						search: 'const ',
						replace: 'global.',
						flags: 'g'
					},
					{
						search: '(.*) = {}',
						replace: 'global.$1 = {}',
						flags: 'g'
					},
					{
						search: 'Game = {',
						replace: 'global.Game = {',
						flags: 'g'
					},
					{
						search: 'Order = {',
						replace: 'global.Order = {',
						flags: 'g'
					},
					{
						search: 'PathFinder = {',
						replace: 'global.PathFinder = {',
						flags: 'g'
					},
					{
						search: 'Room = {',
						replace: 'global.Room = {',
						flags: 'g'
					},
					{
						search: 'Spawn = StructureSpawn;',
						replace: 'global.Spawn = StructureSpawn;',
						flags: 'g'
					}
				]
			}
		}
	});

	// Combine the above into a default task
	grunt.registerTask('dist', ['clean', 'copy:screeps', 'file_append:versioning']);
	// grunt.registerTask('default', ['clean', 'copy:screeps', 'file_append:versioning', 'screeps']);
	grunt.registerTask('private', ['clean', 'copy:screeps', 'file_append:versioning', 'rsync:private']);
	grunt.registerTask('test', ['jsbeautifier:verify']);
	grunt.registerTask('pretty', ['jsbeautifier:modify']);
	// grunt.registerTask('default', ['mochaTest']);
	grunt.registerTask('test', ['mochaTest']);
	grunt.registerTask('prepare', ['uglify', 'regex-replace']);
	grunt.registerTask('coverage', ['mocha_istanbul:coverage']);
};
