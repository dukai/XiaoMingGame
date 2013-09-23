define(function(require, exports, module){
	var oo = require('xiaoming/oo');
	var Equipment = require('./equipment');
	/**
	 *饰品 
	 */
	var Adornment = function(){
		Equipment.call(this);
		
		this.name = "饰品";
		this.type = Equipment.type.adornment;
	};
	oo.extend(Adornment, Equipment);
	module.exports = Adornment;
});