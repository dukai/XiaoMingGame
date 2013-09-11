define(function(require, exports, module){
	var ViewManager = require('xiaoming/view-manager');
	var EventManager = require('xiaoming/event-manager');
	var GameBeginView = require('app/views/game-begin-view');
	
	
	var GameBeginController = function(options){
		this._initGameBeginController(options);
	};
	
	GameBeginController.prototype = {
		_initGameBeginController: function(options){
			this.viewManager = new ViewManager();
			this.eventManager = new EventManager();
			
			this.initEvents();
		},
		
		initEvents: function(){
			
			this.eventManager.add(GameBeginView.EVENT_SUBMIT, this.onSubmitClick, this);
		},
		
		run: function(){
			var self = this;
			this.viewManager.getView(this.controllerName, function(viewRef){
				var v = new viewRef();
				v.setRequest(self.request);
				v.setEventManager(self.eventManager);
				self.setView(v);
				self.getView().render();
				
			});
			
		},
		
		setView: function(view){
			this.view = view;
		},
		
		getView: function(){
			return this.view;
		},
		
		setRequest: function(request){
			this.request = request;
		},
		setControllerName: function(controllerName){
			this.controllerName = controllerName;
		},

		login: function(){
			
		},
		
		onSubmitClick: function(event){
			console.log(event.username.value);
			console.log(event.password.value);
		}
		
	};

	module.exports = GameBeginController;
});
