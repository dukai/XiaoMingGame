define(function(require, exports, module){
	var GameMainView = require('app/views/game-main-view');
	var AbstractController = require('xiaoming/abstract-controller');
	var oo = require('xiaoming/oo');
	var resourceLoader = require('xiaoming/resource-loader');
	var GameModel = require('app/models/game-model');
	
	var GameMainController = function(options){
		this._initGameMainController(options);
	};
	
	GameMainController.prototype = {
		_initGameMainController: function(options){
			AbstractController.call(this, options);
			this.gameModel = new GameModel();
		},
		
		initEvents: function(){
			
		},

		onRender: function(){

		}
		
	};
	oo.extend(GameMainController, AbstractController);
	module.exports = GameMainController;
});
