/**
 * color class
 * @author umi
 */
define(['underscore', 'lib/util'], function(_, Util){
	return Util.createClass({
		r: 0,
		g: 0,
		b: 0,
		a: 0,
		initialize: function(r,g,b,a){
			if (!_.isUndefined(r)) this.r = r; 
			if (!_.isUndefined(g)) this.g = g; 
			if (!_.isUndefined(b)) this.b = b; 
			if (!_.isUndefined(a)) this.a = a; 
			this.data = [this.r, this.g, this.b, this.a];
		}
	});
});
