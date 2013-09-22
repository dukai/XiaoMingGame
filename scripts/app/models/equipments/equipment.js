define(function(require, exports, module){
	var util = require('xiaoming/util');
	/**
	 *装备 
	 */
	var Equipment = function(){
		
		this.name;
		
		this.hitPoint = 0;
		this.stamina = 0;
		this.attackPower = 0;
		this.healPower = 0;
		this.physicalArmor = 0;
		this.magicArmor = 0;
		this.dodge = 0;
		this.criticalStrike = 0;
		this.lucky = 0;
		this.mobility = 0;
		/**
		 *所有属性列表 
		 */
		this.propertyList = ['hitPoint', 'stamina', 'attackPower', 'healPower', 'physicalArmor', 'magicArmor', 'dodge', 'criticalStrike', 'lucky', 'mobility'];
		/**
		 *激活的属性列表 
		 */
		this.activePropertyList = [];
		/**
		 *装备等级 
		 */
		this.level = 1;
		/**
		 *装备部位类型 
		 */
		this.type = null;
		/**
		 *装备护甲类型 
		 */
		this.armorType = null;
		/**
		 *装备武器类型 
		 */
		this.weaponType = null;
		
	};
	
	Equipment.prototype = {
		/**
		 *初始化装备属性
		 * @param {JSON} 装备属性集合 
		 */
		initEquipmentProperty: function(data){
			for(var name in data){
				if(util.inArray(name, this.propertyList)){
					this[name] = data[name];
					this.activePropertyList.push(name);
				}
			}
		},
		/**
		 *设置装备名字
		 * @param {String} name 
		 */
		setName : function(name){
			this.name = name;
		}
	};
	/**
	 *装备部位类型，装备类型对应身体的装备部位
	 */
	Equipment.type = {
		/**
		 * 头
		 */
		head: 'head',
		/**
		 *胸 
		 */
		chest: 'chest',
		/**
		 *腿 
		 */
		leg: 'leg',
		/**
		 *手 
		 */
		hand: 'hand',
		/**
		 *手腕 
		 */
		wrist: 'wrist',
		/**
		 *脚 
		 */
		foot: "foot",
		/**
		 *腰 
		 */
		waist: "waist",
		/**
		 *饰品 
		 */
		adornment: "adornment",
		/**
		 *手指
		 */
		finger: "finger",
		/**
		 *主武器 
		 */
		weaponMain: "weapon_main",
		/**
		 *副武器 
		 */
		weaponSub: "weapon_sub"
	};
	/**
	 *护甲装备类型
	 */
	Equipment.armorType = {
		/**
		 *布甲 
		 */
		cloth : 0,
		/**
		 *皮甲 
		 */
		leather : 1,
		/**
		 *锁甲 
		 */ 
		chain : 2,
		/**
		 *板甲 
		 */
		plate : 3 
	};
	/**
	 *武器装备类型 
	 */
	Equipment.weaponType = {
		/**
		 *剑 
		 */
		sword: 0,
		/**
		 *枪 
		 */
		spear: 1,
		/**
		 *弓 
		 */
		bow: 2,
		/**
		 *法杖 
		 */
		staff: 3,
		/**
		 *刀斧 
		 */
		chopper: 4,
		/**
		 *书 
		 */
		book: 5
	};
});
