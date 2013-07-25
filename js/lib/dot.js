/**
 * dot class
 * @author umi
 */
define(['underscore', 'lib/util', 'lib/color'], function(_, Util, Color){
	return Util.createClass({
		initialize: function(d){
			this.setColors(d.colors);
			this.convert(d.data);
			this.preRender();
		},
		setColors: function(colors){
			if(colors){
				this.colors = colors;
			}else{
				this.colors = [new Color(), new Color(0,0,0,255)];
			}
			this._convert = _.memoize(this.__convert);
		},
		convert: function(data, force){
			try{
				if (force) this._convert = _.memoize(this.__convert);
				var obj				= this._convert(data);
				this.height		= obj.height;
				this.width		= obj.width;
				this.data			= obj.dataList;
			}catch(e){
				console.log(e);
			}
		},
		getColorData: function(color){
			var index = this.colors.hasOwnProperty(color) ? color: 0;
			return this.colors[index].data;
		},
		preRender: function(){ this.canvas = document.createElement('canvas');
			this.canvas.width = this.width;
			this.canvas.height = this.height;
			var ctx = this.canvas.getContext('2d');
			var ImageData = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
			_.extend(ImageData.data, this.data);
			ctx.putImageData(ImageData, 0, 0);
		},
		__convert: function(data){
			var height = data[0].length;
			var width = _.max(data[0], function(l){return l.length}).length;
			var dataList = [];
			var i, j, k, color;
			for(k = 0;k < data.length;k++){
				for(i = 0;i < height;i++){
					for(j = 0;j < width;j++){
						color = _.isUndefined(data[k][i]) ? 0 : data[k][i][j];
						Array.prototype.push.apply(dataList, this.getColorData(color));
					}
				}
			}
			height = height * data.length;

			return {height: height, width: width, dataList: dataList};
		}
	});
});
