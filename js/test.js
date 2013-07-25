requirejs.config({
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
	},
	urlArgs: "bust=" +  (new Date()).getTime()
});
require(['jquery', 'underscore'], function(){
	$.ajax({
		url: '/template/head.tmpl?bust=' + (new Date()).getTime(),
		responceType: 'text'
	}).done(function(txt){
		$('#header').html(_.template(txt)());
	});
});
require([
	'jquery',
	'underscore',
	'lib/event',
	'lib/screen',
	'dot/ocha',
	'lib/control', 
	'dot/block',
	'lib/hardBlock', 
],
function($, _, Event, Screen, Ocha, Control, Block, HardBlock){
	var ocha = new Ocha();
	var screen = new Screen('canvas');
	var block = new Block();
	var ochaControl = new Control(ocha, screen);
	var hardBlock = [];
	hardBlock.push(new HardBlock(block, screen));
	hardBlock.push(new HardBlock(block, screen));
	hardBlock.push(new HardBlock(block, screen));
	hardBlock.push(new HardBlock(block, screen));
	hardBlock.push(new HardBlock(block, screen));
	hardBlock.push(new HardBlock(block, screen));

	_.each(hardBlock, function(block, key){
		block.registerHitTest(ochaControl);
		block.setX(300 + key * 16);
		block.setY(200 + key * 16);
		console.log(block);
	});

	$(Event).on(Event.ENTER_FRAME_INIT, function(){
		screen.ctx.clearRect(0, 0, screen.width, screen.height);
	}).on(Event.ENTER_FRAME, function(){
		_.each(hardBlock, function(block, key){
			block.draw();
		});
		ochaControl.draw();
	});
});
