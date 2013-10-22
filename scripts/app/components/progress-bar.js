define(function(require, exports, module){
	var Kinetic = require('kinetic');
	/**
	 * progress bar view for exp bar ,hp bar and so on
	 */

	var ProgressBar = function(options){
		this._initProgressBar(options);
	}

	ProgressBar.prototype = {
		_initProgressBar: function(options){
			Kinetic.Group.call(this, options);
			var bg = new Kinetic.Rect({
				x: 0,
				y: 0,
				width: 104,
				height:6,
				fill: this.getFill(),
				opacity: .5
			});

			var bar = this.bar = new Kinetic.Rect({
				x: 2,
				y: 2,
				width:100,
				height: 2,
				fill: this.getFill()
			});

			this.add(bg);
			this.add(bar);
		},

		setPercent: function(percent ){
			this.bar.setWidth(parseInt(percent * 100));
			//this.bar.transitionTo({width: percent * 100});
		}
	};

	Kinetic.Util.extend(ProgressBar, Kinetic.Group);
	Kinetic.Factory.addGetterSetter(ProgressBar, 'fill');

	module.exports = ProgressBar;
});