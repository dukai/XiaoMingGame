define(function(require, exports, module){
	
	/**
	 *装备管理器
	 * @param {Person} person
	 */
	var EquipmentsManager = function(person){
		this.person = person;
		this.equipments = {
			//头部
			head: null,
			//胸部
			chest: null,
			//腿部
			leg: null,
			//手部
			hand: null,
			//手腕
			wrist: null,
			//鞋子
			foot: null,
			//腰部
			waist: null,
			//饰品
			adornment: [],
			//戒指
			finger: [],
			//武器
			weapon_main: null,
			weapon_sub: null
		};
		this.equipmentsList = [];
		this.properties = {};
		
	};
	
	EquipmentsManager.prototype = {
		/**
		 * 装备一件装备
		 * @param {Equipment.type} 装备类型
		 * @param {Equipment} 装备
		 * @param {int, optional} 位置，指环和饰品
		 */
		equip: function(type, equipment, position){
			//排除装备为戒指和饰品的情况
			if(equipment.armorType === null && equipment.weaponType === null && (equipment.type !== Equipment.type.finger && equipment.type !== Equipment.type.adornment)){
				debug && console.log(equipment.name + "装备失败：未知类型的装备");
				return;
			}
			if(equipment.armorType !== null && this.person.armorType < equipment.armorType){
				debug && console.log(equipment.name + '装备失败：无法装备此种类型的护甲');
				return;
			}
			
			if(equipment.weaponType !== null && this.person.weaponType != equipment.weaponType){
				debug && console.log(equipment.name + '装备失败：无法装备此种类型的武器');
				return;
			}
			
			
			if(type != equipment.type){
				debug && console.log(equipment.name + '装备失败：此处无法装备此类装备');
				return;
			}
			if(equipment.level > this.person.level){
				debug && console.log(equipment.name + '装备失败：装备等级太高无法装备');
				return;
			}
			if(this.equipments[type] instanceof Array){
				if(this.equipments[type].length > 0){
					position = 1;
				}else{
					position = 0;
				}
			}
			if(position === undefined){
				var e = this.equipments[type];
				this.equipments[type] = equipment;
			}else{
				position = parseInt(position);
				if(position > 1){
					position = 0;
				}
				var e = this.equipments[type][position];
				this.equipments[type][position] = equipment;
			}
			if(e !== null && this.equipmentsList.length > 0){
				util.removeByValue(e, this.equipmentsList);
			}
			
			this.equipmentsList.push(equipment);
			debug && console.log(equipment.name + '装备成功');
		},
		/**
		 * 根据类型获取装备
		 * @param {Equipment.type} 类型
		 */
		getEquipment: function(type){
			return this.equipments[type];
		},
		/**
		 *获取所有装备属性集合 
		 */
		getPropertyCollection: function(){
			this.properties = {};
			for(var i = 0, len = this.equipmentsList.length; i < len; i++){
				var e = this.equipmentsList[i];
				for(var pi in e.activePropertyList){
					var pName = e.activePropertyList[pi];
					if(this.properties[pName] !== undefined){
						this.properties[pName] += e[pName];
					}else{
						this.properties[pName] = e[pName];
					}
				} 
			}
			return this.properties;
		}
	};
	
	module.exports = EquipmentsManager;

});