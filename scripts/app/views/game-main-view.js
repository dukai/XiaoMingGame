define(function(require, exports, module){
	var $c = require('xiaoming/elements');
	var oo = require('xiaoming/oo');
	var Kinetic = require('kinetic');
	var AbstractView = require('xiaoming/abstract-view');
	
	var GameMainView = function(options){
		this._initGameMainView(options);
	};
	
	GameMainView.prototype = {
		_initGameMainView: function(options){
			AbstractView.call(this, options);
		},
		
		initUI: function(){
			var canvas = $c('canvas', 'main-game-canvas');
			canvas.width = 960;
			canvas.height = 640;
			this.container.appendChild(canvas);
		}
	};
	
	GameMainView.EVENT_SUBMIT = 'game-main-view-submit';
	oo.extend(GameMainView, AbstractView);
	
	module.exports = GameMainView;
});