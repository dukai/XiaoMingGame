define(function(require, exports, module){
	var ControllerManager = require('./controller-manager');
	
	var Application = function(options){
		this._initApplication(options);
	};

	Application.prototype = {
		_initApplication: function(options){
			this.options = options;
			this.controllerManager = new ControllerManager();
			this.canvas = document.getElementById(this.options.canvas);
			this.divcontainer = document.getElementById(this.options.div);
			this.request = {
				canvas: this.canvas,
				divcontainer: this.divcontainer
			}
		},

		run: function(){
			var self = this;
			if(this.options.defaultController){
				this.controllerManager.getController(this.options.defaultController, function(controllerRef){
					var ctrl = new controllerRef();
					ctrl.set('request', self.request);
					ctrl.set('controllerName', self.options.defaultController);
					ctrl.run();
				});
			}
		}
	};
	
	module.exports = Application;
});