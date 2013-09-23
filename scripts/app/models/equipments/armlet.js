define(function(require, exports, module){
	var oo = require('xiaoming/oo');
	var Equipment = require('./equipment');
	/**
	 *护腕 
	 */
	var Armlet = function(){
		Equipment.call(this);
		
		this.name = "护腕";
		this.type = Equipment.type.wrist;
		this.activePropertyList.push('physicalArmor');
	};
	oo.extend(Armlet, Equipment);
	module.exports = Armlet;
});