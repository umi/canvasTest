/**
 * screen classs
 * @author umi
 */
define(['jquery', 'lib/util'], function($, Util){
	return Util.createClass({
		initialize: function(id){
			var canvas = $('#'+id).get(0);
			this.width = canvas.width;
			this.height = canvas.height;
			this.ctx = canvas.getContext('2d');
			this.ctx.imageSmoothingEnabled = false;
			this.ctx.mozImageSmoothingEnabled = false;
			this.ctx.webkitImageSmoothingEnabled = false;
		},
		draw: function(c){
			var width = c.obj.width ? c.obj.width: c.obj.dot.canvas.width;
			var height = c.obj.height ? c.obj.height: c.obj.dot.canvas.height;
			this.ctx.drawImage(c.obj.dot.canvas, 0, height*c.layer, width, height, ~~c.p.y, ~~c.p.x, width, height);
		},
		drawImage: function(){
			this.ctx.drawImage.apply(this.ctx, arguments);
		}
	});
});
