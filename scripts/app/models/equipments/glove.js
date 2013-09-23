define(function(require, exports, module){
	var oo = require('xiaoming/oo');
	var Equipment = require('./equipment');
	/**
	 *手套 
	 */
	var Glove = function(){
		Equipment.call(this);
		
		this.name = "手套";
		this.type = Equipment.type.hand;
		this.physicalArmor = 5;
		this.activePropertyList.push('physicalArmor');
		this.activePropertyList.push('hitPoint');
	};
	oo.extend(Glove, Equipment);
	module.exports = Glove;
});