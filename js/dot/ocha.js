/**
 * dot data ocha
 * @author umi
 */
define(['jquery', 'underscore', 'lib/util', 'lib/color', 'lib/dot'], function($, _, Util, Color, Dot){
	return Util.createClass({
		height: 16,
		width: 16,
		initialize: function(){
			var dotData = [
						[0,0,1,1,1,0,0,0,1,1,0,0,0,0,0,0],
						[0,0,1,3,5,1,1,1,8,8,1,0,0,0,0,0],
						[0,0,1,3,5,5,8,8,8,8,9,1,1,1,1,1],
						[0,0,1,5,5,3,9,8,9,5,5,3,3,3,5,1],
						[0,0,1,5,3,3,3,5,5,3,3,5,5,3,5,1],
						[0,0,1,3,5,5,3,5,5,3,3,3,5,5,1,0],
						[0,1,3,5,4,4,5,4,4,5,3,5,5,1,0,0],
						[1,3,5,4,1,4,4,4,1,4,5,5,3,3,1,0],
						[1,3,5,4,1,4,4,4,1,4,5,3,3,3,1,0],
						[1,3,5,7,4,4,4,4,4,7,5,3,3,5,1,0],
						[0,1,1,5,6,6,6,6,6,5,5,1,1,1,0,0],
						[0,0,1,1,3,2,2,2,5,5,1,1,0,0,0,0],
						[0,0,1,4,5,3,3,2,5,4,4,1,0,0,0,0],
						[0,0,1,1,5,3,5,5,5,5,1,1,0,0,0,0],
						[0,0,0,0,1,4,1,1,4,1,0,0,0,0,0,0],
						[0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0]
					];
			this.dot = new Dot({
				data: [
					dotData,
					Util.dotReverse(dotData)
				],
				colors: [
					new Color(),
					new Color(0,0,0,255),
					new Color(255,204,51,255),
					new Color(115,173,122,255),
					new Color(255,226,208,255),
					new Color(87,124,78,255),
					new Color(221,151,108,255),
					new Color(211,120,109,255),
					new Color(173,195,151,255),
					new Color(114,130,96,255)
				]
			});
		}
	});
});
