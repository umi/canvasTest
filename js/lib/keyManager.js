/**
 * keyManager class
 * @author umi
 */
define(['lib/util', 'underscore', 'lib/event'], function(Util, _, Event){
	return Util.createSingleton({
		_map: {
			'left'	: 37,
			'right'	: 39,
			'up'		: 38,
			'down'	: 40,
			'space'	: 32,
			'x'			: 88,
		},
		initialize: function(propagation){
			this.stopPropagation = propagation;
			this.key_buffer = [];
			$(Event).on(Event.KEY_DOWN, _.bind(function(event, e){
				this.key_buffer[e.keyCode]=true;
				this._propagation(e);
			}, this))
			.on(Event.KEY_UP, _.bind(function(event, e){
				this.key_buffer[e.keyCode]=false;
				this._propagation(e);
			}, this))
			.on(Event.WINDOW_BLUR, _.bind(function(event, e){
				this.key_buffer=[];
				this._propagation(e);
			}, this));
		},
		keyIsDown: function(code){
			return !!this.key_buffer[code];
		},
		key: function(key_str){
			return this.keyIsDown(this._map[key_str]);
		},
		up: function(){
			return this.keyIsDown(this._map.up);
		},
		down: function(){
			return this.keyIsDown(this._map.down);
		},
		left: function(){
			return this.keyIsDown(this._map.left);
		},
		right: function(){
			return this.keyIsDown(this._map.right);
		},
		space: function(){
			return this.keyIsDown(this._map.space);
		},
		code: function(key){
			return this._map.key;
		},
		stopPropagation: false,
		_propagation: function(e){
			if (this.stopPropagation) e.stopPropagation();
		}
	});
});
