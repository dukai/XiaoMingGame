define(function(require, exports, module){
	var oo = require('xiaoming/oo');
	var Equipment = require('./equipment');
	/**
	 *指环 
	 */
	var Ring = function(){
		Equipment.call(this);
		
		this.name = "指环";
		this.type = Equipment.type.finger;
	};
	oo.extend(Ring, Equipment);
	module.exports = Ring;
});