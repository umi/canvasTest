/**
 * util class
 * @author umi
 */
define(['underscore'], function(_){
	return {
		createClass: function(obj){
			return (function(){
				function __(){
					this.initialize.apply(this, arguments);
				}
				__.prototype = _.extend({initialize: function(){}}, obj);
				return __;
			})();
		},
		createSingleton: function(obj){
			return (function(){
				var _flg = false;
				function __(){
					if(_flg !== true){throw new Error("must use the getInstance.");}
					this.initialize.apply(this, arguments);
					_flg = false;
				}
				__.getInstance = _.once(function(a){
					_flg = true;
					return new this(a);
				});
				__.prototype = _.extend({initialize: function(){}}, obj);
				return __;
			})();
		},
		dotReverse: function(dotData){
			var i, data=[], tmp;
			for(i=0;i<dotData.length;i++){
				tmp = dotData[i].concat();
				data.push(tmp.reverse());
			}

			return data;
		}
	};
});
