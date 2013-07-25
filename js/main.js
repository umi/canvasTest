require.config({
	shim: {
		jquery: {
			exports: ['$','jQuery']
		},
		underscore: {
			exports: '_'
		},
		bootstrap: {
			deps: ['jquery']
		}
	},
	paths: {
		jquery:			'lib/jquery-1.9.0.min',
		underscore:	'lib/lodash.min',
		bootstrap:	'lib/bootstrap.min'
	}
});
require([
	'jquery',
	'underscore',
	'bootstrap'
],
function($, _){
	console.log('load');
});
