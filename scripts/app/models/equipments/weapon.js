/**
 * Weapon
 */
define(function(require, exports, module){
	var oo = require('xiaoming/oo');
	var Equipment = require('./equipment');
	/**
	 *武器
	 */
	var Weapon = function(){
		Equipment.call(this);
		this.type = Equipment.type.weaponMain;
		this.activePropertyList.push('attackPower');
	};
	oo.extend(Weapon, Equipment);
	/**
	 *剑
	 */
	var Sword = function(){
		Weapon.call(this);

		this.name = "剑";
		this.weaponType = Equipment.weaponType.sword;
		this.attackPower = 10;
	};
	oo.extend(Sword, Weapon);
	/**
	 *长枪
	 */
	var Spear = function(){
		Weapon.call(this);

		this.name = "长枪";
		this.weaponType = Equipment.weaponType.spear;
		this.attackPower = 10;
	};
	oo.extend(Spear, Weapon);

	WeaponFactory = {
		create: function(id){
			switch(id){
				case Equipment.weaponType.sword:
					return new Sword();
					break;
				case Equipment.weaponType.spear:
					return new Spear();
					break;
				case Equipment.weaponType.staff:
					return new Sword();
					break;
				case Equipment.weaponType.bow:
					return new Sword();
					break;
				case Equipment.weaponType.book:
					return new Sword();
					break;
				case Equipment.weaponType.chopper:
					return new Sword();
					break;
			}

		}
	};
	module.exports = WeaponFactory;
});