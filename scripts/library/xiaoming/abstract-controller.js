define(function(require, exports, module){
	var ViewManager = require('xiaoming/view-manager');
	var util = require('xiaoming/util');
	
	
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
			this._controllerManager = null;
			this._eventManager = null;
			this._router = null;
			
		},
		//视图管理器
		_viewManager : new ViewManager(),
		
		_initEvents: function(){
			this.initEvents();
		},
		/**
		 * Abstract method 
		 */
		initEvents: function(){
			//TODO: override
		},
		/**
		 * Abstract method onRender 
		 */
		onRender: function(event){
			//TODO: override
		},
		
		addDefaultEvents: function(){
			this.get('eventManager').addEventListener(this.getRenderEventName(), this.onRender, this);
		},
		//执行controller
		run: function(){
			var self = this;
			self._initEvents();
			var viewName = this._viewManager.getViewNameByControllerName(this.get('controllerName'));
			this._viewManager.getView(this.get('controllerName'), function(viewRef){
				var v = new viewRef();
				v.set('viewName', viewName);
				v.setRequest(self.get('request'));
				v.setEventManager(self.get('eventManager'));
				self.set('view', v);
				self.addDefaultEvents();
				self.get('view').render();
			});
			
		},
		/**
		 * 前进
		 * @param intent {controllerName, request, controllerManager, eventManager}
		 */
		forward: function(intent){
			this.get('router').dispatch(intent);
		},
		
		destroy: function(){
			this._view.destroy();
		},
		getRenderEventName: function(){
			return util.camel2Dash(this._controllerName).replace('-controller', '-render');
		},
		setEventManager: function(eventManager){
			this._eventManager = eventManager;
		},
		
		getEventManager: function(eventManager){
			return this._eventManager;
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
