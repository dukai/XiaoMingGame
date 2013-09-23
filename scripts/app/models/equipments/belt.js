define(function(require, exports, module){
	var oo = require('xiaoming/oo');
	var Equipment = require('./equipment');
	/**
	 *腰带 
	 */
	var Belt = function(){
		Equipment.call(this);
		
		this.name = "腰带";
		this.type = Equipment.type.waist;
		this.activePropertyList.push('physicalArmor');
	};
	oo.extend(Belt, Equipment);
	module.exports = Belt;
});