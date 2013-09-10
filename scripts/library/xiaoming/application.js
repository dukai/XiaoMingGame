define(function(require, exports, module){
	var ControllerManager = require('./controller-manager');
	var Application = function(options){
		this._initApplication(options);
	};

	Application.prototype = {
		_initApplication: function(options){
			this.options = options;
			this.controllerManager = new ControllerManager();
		},

		run: function(){
			if(this.options.defaultController){
				var controllerClass = this.controllerManager.getController(this.options.defalutController);
			}
		}
	};
});