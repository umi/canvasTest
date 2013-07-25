define(['jquery', 'underscore', 'lib/util', 'lib/event'], function($, _, Util, Event){
	return Util.createClass({
		p: {x: 0, y: 0},
		layer: 0,
		initialize: function(obj, screen){
			this.obj = obj;
			this.screen = screen;
			this.p = {x: 0, y: 0};
		},
		draw: function(){
			this.screen.drawImage(this.obj.dot.canvas, 0, this.obj.height*this.layer, this.obj.width, this.obj.height, ~~this.p.y, ~~this.p.x, this.obj.width, this.obj.height);
		},
		setX: function(x){
			this.p.x = x;
		},
		setY: function(y){
			this.p.y = y;
		},
		registerHitTest: function(obj){
			$(obj).on(Event.HIT_TEST, _.bind(this.hitEvent, this));
		},
		hitEvent: function(e, n, o, obj){
			var ow = obj.obj.width;
			var oh = obj.obj.height;
			var tw = this.obj.width;
			var th = this.obj.height;
			var tx = this.p.x;
			var ty = this.p.y;
			if(this.hitTest(n, {x:n.x+oh, y:n.y+ow})){
				var a = (n.y - o.y) / (n.x - o.x);
				if(n.x > o.x && o.x + oh <= tx && n.x + oh >= tx){
					var sy = (tx - oh - o.x) * a + o.y;
					if(sy < ty + tw && sy + ow > ty){
						$(obj).trigger(obj.EVENT_LANDING, [tx - oh]);
					}
				}else if(n.x < o.x && o.x >= tx + th && n.x <= tx + th){
					var sy = (tx + th - o.x) * a + o.y;
					if(sy < ty + tw && sy + ow > ty){
						/* イベント投げるように変更する */
						obj.setX(tx + th);
						obj.setVX(0);
					}
				}
				a = (n.x - o.x) / (n.y - o.y);
				if(n.y > o.y && o.y + ow <= ty && n.y + ow >= ty){
					var sx = (ty - ow - o.y) * a + o.x;
					if(sx < tx + th && sx + oh > tx){
						/* イベント投げるように変更する */
						obj.setY(ty - ow);
						obj.setVY(0);
					}
				}else if(n.y < o.y && o.y >= ty + tw && n.y <= ty + tw){
					var sx = (ty + tw - o.y) * a + o.x;
					if(sx < tx + th && sx + oh > tx){
						/* イベント投げるように変更する */
						obj.setY(ty + tw);
						obj.setVY(0);
					}
				}
			}
		},
		hitTest: function(min, max){
			var minX = this.p.x;
			var minY = this.p.y;
			var maxX = minX+this.obj.height;
			var maxY = minY+this.obj.width;

			return min.x <= maxX && minX <= max.x && min.y <= maxY && minY <= max.y;
		},
		hitEventFunc: function(newPoint, oldPoint, obj){
			
			$(obj).trigger(Event.HIT_TEST, [{x:nx, y:ny}, {x:this.p.x, y:this.p.y}, this]);
		}
	});
});
