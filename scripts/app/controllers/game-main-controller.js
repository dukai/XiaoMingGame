define(function(require, exports, module){
	var GameBeginView = require('app/views/game-main-view');
	var AbstractController = require('xiaoming/abstract-controller');
	var oo = require('xiaoming/oo');
	
	
	
	var GameMainController = function(options){
		this._initGameMainController(options);
	};
	
	GameMainController.prototype = {
		_initGameMainController: function(options){
			AbstractController.call(this, options);
		},
		
		initEvents: function(){
			
			this.eventManager.add(GameBeginView.EVENT_SUBMIT, this.onSubmitClick, this);
		},
		

		login: function(){
			
		},
		
		onSubmitClick: function(event){
			console.log(event);
			
		}
		
	};
	oo.extend(GameMainController, AbstractController);
	module.exports = GameMainController;
});
