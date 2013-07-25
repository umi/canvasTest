/**
 * fireControl class
 * @author umi
 */
define(['jquery', 'underscore', 'lib/util', 'lib/event'], function($, _, Util, Event){
	return Util.createClass({
		p: {x: 0, y: 0},
		v: {x: 0, y: 0},
		layer: 0,
		frict: 1,
		delete: 0,
		initialize: function(obj, screen, p, v){
			this.p = _.extend({}, this.p, p);
			this.v = _.extend({}, this.v, v);
			this.screen = screen;
			this.obj = obj;
			this.screen = screen;
			this._enterFrame = _.bind(this.enterFrame, this);
			$(Event).on(Event.ENTER_FRAME, this._enterFrame);
		},
		gravity: function(){
			this.v.x = this.v.x + this.frict;

			return this;
		},
		enterFrame: function(){
			this.p.x += this.v.x;
			this.p.y += this.v.y;
			this.layer = (this.layer + 1) % 2
			if(this.p.x > this.screen.height - this.obj.height){
				this.p.x = this.screen.height - this.obj.height;
				this.v.x = -this.v.x * 1.1;
			}
			this.gravity();
			if(this.p.y < 0 - this.obj.width || this.p.y > this.screen.width){
				$(Event).off(Event.ENTER_FRAME, this._enterFrame);
				this.delete = 1;
				delete this;
			}
		}
	});
});
