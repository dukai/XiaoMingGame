define(function(require, exports, module){
	var PlayerModel = require('./char-model');
	var oo = require('xiaoming/oo');
	var Equipment = require('../equipments/equipment');
    var CharType = require('./char-type');
	var Swordman = function(options){
		this._initSwordman(options);
	};
	
	Swordman.prototype = {
		_initSwordman: function(options){
			this.options = oo.mix({
				iPropertiesData: {
					hitPoint : 120,
					attackPower : 50,
					physicalArmor : 25,
					magicArmor : 10,
					dodge : .08,
					criticalStrike : .2,
					lucky : .3,
					block : .3,
					mobility : 4,
					attackRange : {min: 1, max: 1}
				}
			},this.options);
			PlayerModel.call(this, options);

			//设置装备类型
			this.armorType = Equipment.armorType.chain;
			this.weaponType = Equipment.weaponType.sword;
			this.units = '剑士';
            this.charType = CharType.roleType.swordman;
		}
	};

	oo.extend(Swordman, PlayerModel);

	module.exports = Swordman;
});
