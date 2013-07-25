define(['jquery', 'underscore', 'lib/util', 'lib/keyManager', 'lib/event', 'lib/fireBall', 'lib/fireControl'], function($, _, Util, KeyManager, Event, FireBall, FireControl){
	return Util.createClass({
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
				}
			}, this));
		},
		enterFrame: function(){
			this.fc = _.reject(this.fc, function(f){return f.delete;});
			_.each(this.fc, _.bind(function(f){
				this.screen.draw(f);
			}, this));
			if(this.key.left()){
				this.left();
			}
			if(this.key.right()){
				this.right();
			}
			if(this.key.up()||this.key.space()){
				if(this.p.x == this.screen.height - this.obj.height){
					this.jump();
				}
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

			if(this.p.x < this.screen.height - this.obj.height){
				this.gravity();
			}
			this.decay();

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
			this.v.x = -this.jp;
		},
		accel: function(v){
			this.v.x += v.x;
			this.v.y += v.y;

			return this;
		},
		decay: function(){
			if(this.v.x < 1 && this.v.x > -1){this.v.x = 0;}
			if(this.v.y != 0){
				if(this.v.y > 0){
					this.v.y = Math.max(this.v.y - this.frict, 0);
				}else{
					this.v.y = Math.min(this.v.y + this.frict, 0);
				}
			}

			return this;
		},
		gravity: function(){
			this.v.x += this.frict;

			return this;
		},
		exec: function(){
			// this.v.x = Math.max(Math.min(this.v.x, this.maxSpeed), -this.maxSpeed);
			// this.v.y = Math.max(Math.min(this.v.y, this.maxSpeed), -this.maxSpeed);
			var nx = this.p.x + Math.max(Math.min(this.v.x, this.maxSpeed), -this.maxSpeed);
			var ny = this.p.y + Math.max(Math.min(this.v.y, this.maxSpeed), -this.maxSpeed);
			/* 各方向当たり判定イベント発行 */
			
			/**/
			this.p.x = nx;
			this.p.y = ny;
		}
	});
});
