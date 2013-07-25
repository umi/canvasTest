/**
 * event class
 * @author umi
 */
define(['jquery', 'underscore', 'lib/util'], function($, _, Util){
	(function (w, r) {
		w['r'+r] = w['r'+r] || w['webkitR'+r] || w['mozR'+r] || w['msR'+r]
		|| w['oR'+r] || function(c){ w.setTimeout(c, 1000 / 60); };
	})(window, 'equestAnimationFrame');
	var event = Util.createSingleton({
		ENTER_FRAME_INIT: 'enterframeinitial',
		ENTER_FRAME: 'enterframe',
		ENTER_FRAME_TERM: 'enterframeterminal',
		KEY_DOWN: 'keydown',
		KEY_UP: 'keyup',
		WINDOW_BLUR: 'windowblur',
		HIT_TEST: 'hittest',
		HIT_TEST_TOP: 'hittesttop',
		HIT_TEST_BOTTOM: 'hittestbottom',
		HIT_TEST_LEFT: 'hittestleft',
		HIT_TEST_RIGHT: 'hittestright',
		initialize: function(){
			var enterFrame = _.bind(function(){
				$(this).trigger(this.ENTER_FRAME_INIT);
				$(this).trigger(this.ENTER_FRAME);
				$(this).trigger(this.ENTER_FRAME_TERM);
				requestAnimationFrame(enterFrame);
			}, this);
			enterFrame();
			$(document)
			.keydown(_.bind(function(e){
				$(this).trigger(this.KEY_DOWN, e);
			}, this))
			.keyup(_.bind(function(e){
				$(this).trigger(this.KEY_UP, e);
			}, this));
			$(window).blur(_.bind(function(e){
				$(this).trigger(this.WINDOW_BLUR, e);
			}, this));
		}
	});

	return event.getInstance();
});
