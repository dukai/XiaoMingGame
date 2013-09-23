define(function(require, exports, module){
	var oo = require('xiaoming/oo');
	var Equipment = require('./equipment');
	/**
	 * 胸甲类
	 */
	var Cuirass = function(){
		Equipment.call(this);
		
		this.name = "胸甲";
		this.type = Equipment.type.chest;
		this.physicalArmor = 10;
		this.activePropertyList.push('physicalArmor');
		this.activePropertyList.push('hitPoint');
	};
	oo.extend(Cuirass, Equipment);
	
});