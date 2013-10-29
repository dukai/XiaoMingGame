define(function(require, exports, module){
	var PlayerModel = require('./char-model');
	var oo = require('xiaoming/oo');
	var Equipment = require('../equipments/equipment');
    var CharType = require('./char-type');
    var PathRange = require('xiaoming/map/path-range');
    var Heal = require('./actions/heal');

	var Pastor = function(options){
		this._initPastor(options);
	};

    Pastor.prototype = {
		_initPastor: function(options){
			this.options = oo.mix({
				iPropertiesData: {
					hitPoint : 80,
					attackPower : 50,
					physicalArmor : 20,
					magicArmor : 10,
					dodge : .1,
					criticalStrike : .1,
					lucky : .1,
					block : 0,
					mobility : 3,
					attackRange : {min: 1, max: 1}
				}
			},this.options);
			PlayerModel.call(this, options);

			//设置装备类型
			this.armorType = Equipment.armorType.cloth;
			this.weaponType = Equipment.weaponType.book;
			this.units = '牧师';
            this.charType = CharType.roleType.pastor;
            this.action = new Heal();
            this.actionList.attack.name = "治疗";
		},

        getAttackRange: function(){
            var center = new PathRange.Node(this.cx, this.cy, this.actualProperties.attackRange);
            var list = this.pathRange.getAttackRange(center, this.team);
            this.attackRange = list;
            return list;
        }
	};

	oo.extend(Pastor, PlayerModel);

	module.exports = Pastor;
});
