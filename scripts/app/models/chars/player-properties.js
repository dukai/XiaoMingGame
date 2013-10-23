define(function(require, exports, module){
	/**
	 * 用户属性信息
	 * @constructor
	 */
	var PlayerProperties = function(options){
		//生命值
		this.hitPoint = 0;
		//体能值
		this.stamina = 0;
		//攻击力
		this.attackPower = 0;
		//加血能力
		this.healPower = 0;
		//物理防御
		this.physicalArmor = 0;
		//魔法防御
		this.magicArmor = 0;
		//躲闪几率
		this.dodge = 0;
		//格挡
		this.block = 0;
		//暴击
		this.criticalStrike = 0;
		//暴击伤害倍率
		this.criticalStrikeDamage = 2;
		//幸运值
		this.luck = 0;
		//移动能力
		this.mobility = 1;
		//攻击范围
		this.attackRange = {min: 0, max: 0};
		//怒气值
		this.rage = 0;
		//消耗
		this.consume = 0;

		this._initPlayerProperties(options);
	};

	PlayerProperties.prototype = {
		_initPlayerProperties: function(options){
			this.setProperties(options);
		},

		setProperties: function(options){
			for(var key in options){
				if(this[key] !== undefined){
					this[key] = options[key];
				}
			}
		},

		add: function(key, playerProperties, extra){
			if(key !== 'attackRange'){
				extra || (extra = 0);
				this[key] = playerProperties[key] + extra;
			}else{
				extra || (extra = {min: 0, max: 0});
				this[key].max = playerProperties[key].max + extra.max;
				this[key].min = playerProperties[key].min + extra.min;
			}
		}
	};

	PlayerProperties.filedsNameList = [
		'hitPoint', 'stamina', 'attackPower',
		'healPower', 'physicalArmor', 'magicArmor',
		'dodge', 'block', 'criticalStrike',
		'criticalStrikeDamage', 'luck', 'mobility',
		'attackRange', 'rage', 'consume'
	];


	module.exports = PlayerProperties;
});