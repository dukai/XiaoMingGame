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

	var ClothHelmet = function(){
		Helmet.call(this);
		
		this.name = "布甲头盔";
		this.armorType = Equipment.armorType.cloth;
		this.hitPoint = 10;
	};
	oo.extend(ClothHelmet, Helmet);
	
	var LeatherHelmet = function(){
		Helmet.call(this);
		
		this.name = "皮甲头盔";
		this.armorType = Equipment.armorType.leather;
		this.hitPoint = 15;
	};
	oo.extend(LeatherHelmet, Helmet);
	
	var ChainHelmet = function(){
		Helmet.call(this);
		
		this.name = "锁甲头盔";
		this.armorType = Equipment.armorType.chain;
		this.hitPoint = 20;
	};
	oo.extend(ChainHelmet, Helmet);
	
	var PlateHelmet = function(){
		Helmet.call(this);
		
		this.name = "板甲头盔";
		this.armorType = Equipment.armorType.plate;
		this.hitPoint = 25;
	};
	oo.extend(PlateHelmet, Helmet);
	
	
	HelmetFactory = {
		create: function(id){
			switch(id){
				case Equipment.armorType.cloth :
					return new ClothHelmet();
					break;
				case Equipment.armorType.leather:
					return new LeatherHelmet();
					break;
				case Equipment.armorType.chain:
					return new ChainHelmet();
					break;
				case Equipment.armorType.plate:
					return new PlateHelmet();
					break;
			}
			
		}
	};
	module.exports = HelmetFactory;
});