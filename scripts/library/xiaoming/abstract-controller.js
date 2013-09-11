define(function(require, exports, module){
	var ViewManager = require('xiaoming/view-manager');
	var EventManager = require('xiaoming/event-manager');
	
	
	var AbstractController = function(options){
		this._initAbstractController(options);
	};
	
	AbstractController.prototype = {
		_initAbstractController: function(options){
			this.options = {};
			
			for(var key in options){
				this.options[key] = options;
			}
			
			
			this._view = null;
			this._request = null;
			this._controllerName = null;
			
			this.eventManager = new EventManager();
			this.initEvents();
		},
		
		_viewManager : new ViewManager(),
		/**
		 * Abstract method 
		 */
		initEvents: function(){
			
		},
		
		run: function(){
			var self = this;
			this._viewManager.getView(this.get('controllerName'), function(viewRef){
				var v = new viewRef();
				v.setRequest(self.get('request'));
				v.setEventManager(self.eventManager);
				self.set('view', v);
				self.get('view').render();
				
			});
			
		},
		
		get: function(key){
			if(this['_' + key]){
				return this['_' + key];
			}else{
				return null;
			}
			
		},
		
		set: function(key, value){
			this['_' + key] = value;
		}
		
	};

	module.exports = AbstractController;
});
