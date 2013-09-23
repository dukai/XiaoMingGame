define(function(require, exports, module){
	var oo = require('xiaoming/oo');
	var Equipment = require('./equipment');
	/**
	 *腿甲 
	 */
	var LegGuard = function(){
		Equipment.call(this);
		
		this.name = "腿甲";
		this.type = Equipment.type.leg;
		this.activePropertyList.push('physicalArmor');
	};
	oo.extend(LegGuard, Equipment);
	module.exports = LegGuard;
});