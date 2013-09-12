define(function(require, exports, module){
	var Router = function(options){
		this._initRouter(options);
	};
	
	Router.prototype = {
		_initRouter: function(options){
			this.controllerStack = [];
			this.activeController = null;
		},
		
		dispatch: function(intent){
			var self = this;
			intent.controllerManager.getController(intent.controllerName, function(controllerRef){
				var ctrl = new controllerRef();
				ctrl.set('controllerManager', intent.controllerManager);
				ctrl.set('request', intent.request);
				ctrl.set('controllerName', intent.controllerName);
				ctrl.set('eventManager', intent.eventManager);
				ctrl.set('router', intent.router);
				self.controllerStack.push(ctrl);
				if(self.activeController){
					self.activeController.distroy();
				}
				
				self.activeController = ctrl;
				ctrl.run();
			});
		}
	};
	
	module.exports = Router;
});
