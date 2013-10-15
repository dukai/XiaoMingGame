define(function(require, exports, module){
	var oo = require('xiaoming/oo');

	var CharAction = function(options){
		this._initCharAction(options);
	};

	CharAction.prototype = {
		_initCharAction: function(options){
			this.options = oo.mix({}, this.options);
			this.options = oo.mix(this.options, options);
		},

		execute: function(pChar, nChar){

		}
	};

	module.exports = CharAction;
});