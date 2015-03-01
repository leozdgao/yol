module.exports = {
	lib: [
		'bower_components/*'
	],
	js: [
		'src/js/*.js'
	],
	css: [
		'src/css/global.css',
		'src/css/*.css'
	],
	views: [
		'views/**/*.hbs'
	],
	monignore: [
		'assets/*',
		'docs/*',
		'src/*',
		'test/*',
		'views/*'
	],
	destJs: 'script.js',
	destCss: 'style.css',
	release: './assets/release'
};