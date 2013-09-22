define(function(require, exports, module){
	var oo = require('xiaoming/oo');
	var Equipment = require('./equipment');
	/**
	 *头盔类 
	 */
	var Helmet = function(){
		Equipment.call(this);
		this.name = "头盔";
		this.type = Equipment.type.head;
		this.activePropertyList.push('hitPoint');
	};
	oo.extend(Helmet, Equipment);
	
});