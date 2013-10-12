define(function(require, exports, module){
	var XmCache = {
		caches: {},

		regist: function(key, value){
			this.caches[key] = value;
		},

		get: function(key){
			return this.caches[key];
		}
	};

	module.exports = XmCache;
});