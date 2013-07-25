define(['jquery', 'underscore', 'lib/util', 'lib/color', 'lib/dot'], function($, _, Util, Color, Dot){
	return Util.createClass({
		height: 4,
		width: 4,
		initialize: function(obj, screen){
			var dotData = [
				[
					[0,1,1,0],
					[1,1,1,1],
					[1,1,1,1],
					[0,1,1,0]
				],
				[
					[0,2,2,0],
					[2,2,2,2],
					[2,2,2,2],
					[0,2,2,0]
				]	
			];
			this.dot = new Dot({
				data: dotData,
				colors: [
					new Color(),
					new Color(255,204,0,255),
					new Color(205,154,0,255)
				]
			});
		}
	});
});
