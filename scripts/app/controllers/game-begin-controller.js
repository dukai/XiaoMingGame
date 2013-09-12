define(function(require, exports, module){
	var GameBeginView = require('app/views/game-begin-view');
	var AbstractController = require('xiaoming/abstract-controller');
	var oo = require('xiaoming/oo');
	//var GameMainController = require('app/controllers/game-main-controller');
	
	
	var GameBeginController = function(options){
		this._initGameBeginController(options);
	};
	
	GameBeginController.prototype = {
		_initGameBeginController: function(options){
			AbstractController.call(this, options);
		},
		
		initEvents: function(){
			
			this.get('eventManager').add(GameBeginView.EVENT_SUBMIT, this.onSubmitClick, this);
		},
		

		login: function(){
			
		},
		
		onSubmitClick: function(event){
			console.log(event);
			var self = this;
			var intent = {
				request: self.get('request'),
				controllerManager: self.get('controllerManager'),
				controllerName: 'GameMainController',
				eventManager: self.eventManager,
				router: self.get('router')
			};
			
			this.forward(intent);
		}
		
	};
	oo.extend(GameBeginController, AbstractController);
	module.exports = GameBeginController;
});
