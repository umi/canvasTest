define(['jquery', 'underscore', 'lib/util', 'lib/keyManager', 'lib/event', 'dot/fireBall', 'lib/fireControl'], function($, _, Util, KeyManager, Event, FireBall, FireControl){
	return Util.createClass({
		EVENT_LANDING: 'landing',
		p: {x: 0, y: 0},
		v: {x: 0, y: 0},
		layer: 0,
		direction: -1,
		speed: 1.4,
		maxSpeed: 15,
		frict: 1,
		jp: 15,
		initialize: function(obj, screen){
			this.key = KeyManager.getInstance();
			this.obj = obj;
			this.screen = screen;
			this.fire = new FireBall();
			this.fc = new Array();
			$(Event).on(Event.ENTER_FRAME, _.bind(this.enterFrame, this))
			.on(Event.KEY_DOWN, _.bind(function(event, e){
				if(e.keyCode == 88){
					var p = {x: this.p.x + this.obj.height / 2 - this.fire.height / 2, y: this.p.y + this.obj.width / 2 - this.fire.width / 2};
					var v = {x: this.v.x - 4, y: this.v.y + this.direction * 2};
					console.log(p, v);
					this.fc.push(new FireControl(this.fire, this.screen, p, v));
				}else if(e.keyCode == 38 || e.keyCode == 32){
					this.jump();
				}
			}, this));
			$(this).on(this.EVENT_LANDING, _.bind(this.landing, this));
		},
		draw: function(){
			this.fc = _.reject(this.fc, function(f){return f.delete;});
			_.each(this.fc, _.bind(function(f){
				this.screen.drawImage(f.obj.dot.canvas, 0, f.obj.height*f.layer, f.obj.width, f.obj.height, ~~f.p.y, ~~f.p.x, f.obj.width, f.obj.height);
			}, this));
			this.screen.drawImage(this.obj.dot.canvas, 0, this.obj.height*this.layer, this.obj.width, this.obj.height, ~~this.p.y, ~~this.p.x, this.obj.width, this.obj.height);
		},
		enterFrame: function(){
			if(this.key.left()){
				this.left();
			}
			if(this.key.right()){
				this.right();
			}
			this.exec();
			if(this.p.x < 0 || this.p.x > this.screen.height - this.obj.height){
				this.p.x = Math.min(Math.max(0, this.p.x), this.screen.height - this.obj.height);
				this.v.x = -this.v.x * 0.5;
			}
			if(this.p.y < 0 || this.p.y > this.screen.width - this.obj.width){
				this.p.y = Math.min(Math.max(0, this.p.y), this.screen.width - this.obj.width);
				this.v.y = -this.v.y * 0.8;
			}
			if(this.p.x == this.screen.height - this.obj.height){
				$(this).trigger(this.EVENT_LANDING, [this.screen.height - this.obj.height]);
			}

			if(this.p.x < this.screen.height - this.obj.height){
				this.gravity(this.frict);
			}
			this.decay(this.frict);

			return this;
		},
		left: function(){
			this.v.y += -this.speed;
			this.layer = 0;
			this.direction = -1;
		},
		right: function(){
			this.v.y += this.speed;
			this.layer = 1;
			this.direction = 1;
		},
		jump: function(){
			if(this.landing > 0){
				this.landing--;
				this.v.x = -this.jp;
			}
		},
		landing: function(e, x){
			this.p.x = x;
			//this.v.x = -this.v.x * 0.5;
			this.v.x = 0;
			this.landing = 1;
		},
		setPoint: function(p){
			this.p = p;
		},
		setX: function(x){
			this.p.x = x;
		},
		setY: function(y){
			this.p.y = y;
		},
		accel: function(v){
			this.v.x += v.x;
			this.v.y += v.y;

			return this;
		},
		setVX: function(x){
			this.v.x = x;
		},
		setVY: function(y){
			this.v.y = y;
		},
		decay: function(frict){
			if(this.v.x < 1 && this.v.x > -1){this.v.x = 0;}
			if(this.v.y != 0){
				if(this.v.y > 0){
					this.v.y = Math.max(this.v.y - frict, 0);
				}else{
					this.v.y = Math.min(this.v.y + frict, 0);
				}
			}

			return this;
		},
		gravity: function(g){
			this.v.x += g;

			return this;
		},
		exec: function(){
			var nx = this.p.x + Math.max(Math.min(this.v.x, this.maxSpeed), -this.maxSpeed);
			var ny = this.p.y + Math.max(Math.min(this.v.y, this.maxSpeed), -this.maxSpeed);
			/* 各方向当たり判定イベント発行 */
			var e = [{x:nx, y:ny}, {x:this.p.x, y:this.p.y}, this];
			
			$(this).trigger(Event.HIT_TEST, e);
			/* 位置再計算 */
			nx = this.p.x + Math.max(Math.min(this.v.x, this.maxSpeed), -this.maxSpeed);
			ny = this.p.y + Math.max(Math.min(this.v.y, this.maxSpeed), -this.maxSpeed);
			/**/

			this.setX(nx);
			this.setY(ny);
		}
	});
});
