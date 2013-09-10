define(function(require, exports, module){
	var ControllerManager = require('./controller-manager');
	var ViewManager = require('./view-manager');
	var Application = function(options){
		this._initApplication(options);
	};

	Application.prototype = {
		_initApplication: function(options){
			this.options = options;
			this.controllerManager = new ControllerManager();
			this.viewManager = new ViewManager();
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
					ctrl.setRequest(self.request);
					self.viewManager.getView(self.options.defaultController, function(viewRef){
						var v = new viewRef();
						v.setRequest(self.request);
						ctrl.setView(v);
						
						ctrl.run();
					});
					
				});
			}
		}
	};
	
	module.exports = Application;
});