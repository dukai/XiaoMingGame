define(function(require, exports, module){
	var ViewManager = function(options){
		this._initViewManager(options);
	};
	
	ViewManager.prototype = {
		_initViewManager: function(options){

		},

		dash2Camel: function(value){
			return value.replace(/(-|^)([a-z])/g, function(g){
				console.log(arguments);
				return arguments[2].toUpperCase();
			});
		},

		camel2Dash: function(value){
			return value.replace(/([^^])([A-Z])/g, '$1-$2').toLowerCase();
		},
		
		getView: function(controllerName, callback){
			require.async('app/views/' +  this.getViewNameByControllerName(controllerName), function(v) {
				callback(v);
			});
		},
		
		getViewNameByControllerName: function(controllerName){
			return this.camel2Dash(controllerName).replace('controller', 'view')
		}
	};
	
	module.exports = ViewManager;
});
