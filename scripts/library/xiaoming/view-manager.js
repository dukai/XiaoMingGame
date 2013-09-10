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
		
		getView: function(viewName, callback){
			require.async('app/views/' + this.camel2Dash(viewName).replace('controller', 'view') , function(v) {
				callback(v);
			});
		}
	};
	
	module.exports = ViewManager;
});
