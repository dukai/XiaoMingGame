define(function(require, exports, module){
	var GameBeginView = require('app/views/game-main-view');
	var AbstractController = require('xiaoming/abstract-controller');
	var oo = require('xiaoming/oo');
	var resourceLoader = require('xiaoming/resource-loader');
	
	
	var GameMainController = function(options){
		this._initGameMainController(options);
	};
	
	GameMainController.prototype = {
		_initGameMainController: function(options){
			AbstractController.call(this, options);
			
			
		},
		
		initEvents: function(){
			
		}
		
	};
	oo.extend(GameMainController, AbstractController);
	module.exports = GameMainController;
});
