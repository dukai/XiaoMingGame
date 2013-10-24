define(function(require, exports, module){
	var PlayerModel = require('./char-model');
	var oo = require('xiaoming/oo');
	var Equipment = require('../equipments/equipment');
    var CharType = require('./char-type');

	var Archer = function(options){
		this._initArcher(options);
	};
	
	Archer.prototype = {
		_initArcher: function(options){
			this.options = oo.mix({
				iPropertiesData: {
					hitPoint : 60,
					attackPower : 60,
					physicalArmor : 20,
					magicArmor : 10,
					dodge : .08,
					criticalStrike : .1,
					lucky : .1,
					block : .1,
					mobility : 3,
					attackRange : {min: 1, max: 3}
				}
			},this.options);
			PlayerModel.call(this, options);

			//设置装备类型
			this.armorType = Equipment.armorType.leather;
			this.weaponType = Equipment.weaponType.bow;
			this.units = '弓箭手';
            this.charType = CharType.roleType.archer;
		}
	};

	oo.extend(Archer, PlayerModel);

	module.exports = Archer;
});
