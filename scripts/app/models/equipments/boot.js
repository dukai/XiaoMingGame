define(function(require, exports, module){
	var oo = require('xiaoming/oo');
	var Equipment = require('./equipment');
	/**
	 *鞋子 
	 */
	var Boot = function(){
		Equipment.call(this);
		
		this.name = "鞋子";
		this.type = Equipment.type.foot;
		this.activePropertyList.push('physicalArmor');
	};
	oo.extend(Boot, Equipment);
	module.exports = Boot;
});