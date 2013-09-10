define(function(require, exports, module){
	var ControllerManager = function(options){
		this._initControllerManager(options);
	};
	
	ControllerManager.prototype = {
		_initControllerManager: function(options){

		},

		dash2Camel: function(value){
			return value.replace(/(-|^)([a-z])/g, function(g){
				console.log(arguments);
				return arguments[2].toUpperCase();
			});
		},

		camel2Dash: function(value){
			return value.replace(/([^^])([A-Z])/g, '$1-$2').toLowerCase();
		}
	};
	
	module.exports = ControllerManager;
});
