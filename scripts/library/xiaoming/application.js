define(function(require, exports, module){
	var ControllerManager = require('./controller-manager');
	var EventManager = require('xiaoming/event-manager');
	var Router = require('xiaoming/router');
	var Application = function(options){
		this._initApplication(options);
	};

	Application.prototype = {
		_initApplication: function(options){
			this.options = options;
			this.controllerManager = new ControllerManager();
			this.canvas = document.getElementById(this.options.canvas);
			this.divcontainer = document.getElementById(this.options.div);
			this.eventManager = new EventManager();
			this.request = {
				container: this.divcontainer
			};
			
			this.router = new Router();
		},

		run: function(){
			var self = this;
			if(this.options.defaultController){
				
				var intent = {
					request: self.request,
					controllerManager: self.controllerManager,
					controllerName: this.options.defaultController,
					eventManager: self.eventManager,
					router: self.router
				};
				
				this.router.dispatch(intent);
				
			}
		}
	};
	
	module.exports = Application;
});