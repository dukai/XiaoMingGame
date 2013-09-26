define(function(require, exports, module){
	var oo = require('xiaoming/oo');
	var util = require('xiaoming/util');
	var EquipmentsManager = require('../equipments/equipment-manager');
    var Experience = require('app/models/chars/experience');
    var CharType = require('app/models/chars/char-type');
    var EventManager = require('xiaoming/event-manager');
    var CharEvent = require('app/models/chars/char-event');
    var CharStatus = require('app/models/chars/char-status');

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
		}
	};

	PlayerProperties.filedsNameList = [
		'hitPoint', 'stamina', 'attackPower',
		'healPower', 'physicalArmor', 'magicArmor',
		'dodge', 'block', 'criticalStrike',
		'criticalStrikeDamage', 'luck', 'mobility',
		'attackRange', 'rage', 'consume'
	]
	/**
	 *人物角色.
	 * @param {string} 人物名字
	 * @param {bool} 性别，男性为true， 女性为false
	 */
	var PlayerModel = function(options){
		this._initPlayerModel(options);
	};
	
	PlayerModel.prototype = {
		_initPlayerModel: function(options){
			this.options = oo.mix({
				gender: true,
				name: '',
				iPropertiesData: {}
			}, this.options);
			
			this.options = oo.mix(this.options, options);
			
			if(!this.options.name){
				this.options.name = util.getName(this.options.gender);
			}
			this.name = this.options.name;
			//性别
			this.gender = this.options.gender;
			//固有属性
			this.inherentProperties = new PlayerProperties(this.options.iPropertiesData);
			//实际属性
			this.actualProperties = new PlayerProperties();
            //坐标
            this.cx = 0;
            this.cy = 0;
            //颜色标识
            this.idColor = CharType.idColorType.blue;
            //char status
            this.status = CharStatus.NORMAL;
			//等级
			this.level = 1;
			//经验
			this.exp = new Experience();
			this.exp.getLevelExp(this.level, true);

			this.hitPointActual = 0;
			//必杀技
			this.mustKill;
			//兵种名称
			this.units;
            //角色类型
            this.charType;
			/**
			 *防御装备类型 
			 */
			this.armorType;
			/**
			 *武器装备类型 
			 */
			this.weaponType;
			//装备管理器
			this.equipmentsManager = new EquipmentsManager(this);
			//装备属性列表
			this.equipmentsProperties = {};
			//动作列表
			this.actionList = {
				attack: {
					name : '攻击',
					code: 'attack'
				},
				mustKill: {
					name: '必杀',
					code: 'mustKill'
				},
				goods: {
					name: '物品',
					code: 'goods'
				},
				search: {
					name: '搜索',
					code: 'search'
				},
				await: {
					name: '待机',
					code: 'await'
				}
			};
			this.updateActualProperties();
            this.eventManager = new EventManager();
		},
		/**
		 * 攻击
		 * @param otherPerson : PlayerModel
		 * @param attackBack : bool
		 */
		attack : function(otherPerson, attackBack){
			if(this.hitPointActual === 0){
				debug && console.log('你已经阵亡了，节哀顺便');
				return;
			}
			if(otherPerson.hitPointActual === 0){
				debug && console.log("鞭尸不是好习惯，道德点减10");
				return;
			}
			var attackMsg = !!attackBack ? '发动了回击：' : '发动了攻击：';
			debug && console.log(this.units + this.name + '对' + otherPerson.units + otherPerson.name + attackMsg);
			var damagePercent = 1;
			var dodgeTurn = Math.ceil(Math.random() * 100);
			var criticalStrikeTurn = Math.ceil(Math.random() * 100);
			//是否暴击
			if(criticalStrikeTurn <= this.actualProperties.criticalStrike * (1 + this.actualProperties.lucky) * 100){
				damagePercent = this.actualProperties.criticalStrikeDamage;
				debug && console.log(this.units + this.name + '暴击了');
			}
			//计算实际伤害
			var actualDamage = Math.ceil(((this.actualProperties.attackPower * damagePercent) - otherPerson.actualProperties.physicalArmor) * (((this.actualProperties.hitPoint - this.hitPointActual) / this.actualProperties.hitPoint) + 1));
			//是否躲避
			if(dodgeTurn <= otherPerson.actualProperties.dodge * 100){
				actualDamage = 0;
				debug && console.log(otherPerson.name + '躲闪了此次攻击');
			}
			if(actualDamage < 0){
				actualDamage = 1;
			}
			debug && console.log('造成了' + actualDamage + '点伤害'); 
			
			//计算伤害结果
			otherPerson.hitPointActual -= actualDamage;
			
			if(otherPerson.hitPointActual <= 0){
				debug && console.log(otherPerson.units + otherPerson.name + '已经死亡');
				
				otherPerson.hitPointActual = 0;
				
				var gains = this.exp.getFightExp(this.level, otherPerson.level);
				
				debug && console.log(this.name + '获取了' + gains + '点经验');
				if(this.exp.updateExp(gains, this.level)){
					this.levelUpgrade();
					debug && console.log(this.name + '升级了！当前等级：' + this.level);
				}
				debug && console.log('-------------');
			}else{
				debug && console.log(otherPerson.name + '剩余生命值' + otherPerson.hitPointActual);
			}
			//格挡几率
			var blockTurn = Math.ceil(Math.random() * 100);
			//格挡成功，发动回击
			if(!attackBack && otherPerson.hitPointActual > 0 && blockTurn <= otherPerson.actualProperties.block * 100){
				
				otherPerson.attack(this, true);
			}
		},
		/**
		 *治疗
		 * @param {Person} 治疗目标 
		 */
		heal: function(otherPerson){
			if(otherPerson.hitPointActual === 0){
				debug && console.log("人已往矣，无力回天，徒呼奈何，节哀顺变！");
				return;
			}
			debug && console.log(this.name + '对' + otherPerson.name + '开始了治疗：');
			var healPercent = 1;
			var criticalStrikeTurn = Math.ceil(Math.random() * 100);
			//是否暴击
			if(criticalStrikeTurn <= this.a.criticalStrike * 100){
				healPercent = this.a.criticalStrikeDamage;
			}
			
			var actualHeal = (this.a.healPower * healPercent);
			otherPerson.hitPointActual += actualHeal;
			if(otherPerson.hitPointActual >= otherPerson.a.hitPoint){
				debug && console.log('血量满');
				otherPerson.hitPointActual = otherPerson.a.hitPoint;
			}else{
				debug && console.log(this.name + '为' + otherPerson.name + '治疗了' + actualHeal + '点生命');			
			}
			debug && console.log(otherPerson.units + otherPerson.name + '当前生命为' + otherPerson.hitPointActual);
		},
		/**
		 * 装备装备
		 * @param type
		 * @param equipment
		 * @param position
		 */
		equip: function(type, equipment, position){
			this.equipmentsManager.equip(type, equipment, position);
			this.equipmentsProperties = this.equipmentsManager.getPropertyCollection();
			this.updateActualProperties();
		},
		/**
		 *升级 
		 */
		levelUpgrade : function(){
			this.level++;
			
			this.inherentProperties.hitPoint = Math.ceil(this.inherentProperties.hitPoint * 1.1);
			this.inherentProperties.attackPower = Math.ceil(this.inherentProperties.attackPower * 1.1);
			this.inherentProperties.physicalArmor = Math.ceil(this.inherentProperties.physicalArmor * 1.1);
			this.inherentProperties.magicArmor = Math.ceil(this.inherentProperties.magicArmor * 1.1);
			this.inherentProperties.healPower = Math.ceil(this.inherentProperties.healPower * 1.1);
			
			this.updateActualProperties();
		},
		
		updateActualProperties: function(){
			for(var i = 0, len = PlayerProperties.filedsNameList.length; i < len; i++){
				var key = PlayerProperties.filedsNameList[i];
				var hpDiff = this.actualProperties.hitPoint - this.hitPointActual;
				var ep = this.equipmentsProperties[key];
				if(!ep){
					ep = 0;
				}
				this.actualProperties[key] = this.inherentProperties[key] + ep;
				if(key == 'hitPoint'){
					this.hitPointActual = this.actualProperties.hitPoint - hpDiff;
				}
			}
		},

        getCx: function(){
            return this.cx;
        },

        setCx: function(value){
            this.cx = value;
        },

        getCy: function(){
            return this.cy;
        },

        setCy: function(value){
            this.cy = value;
        },

        setCoordinate: function(x, y){
            this.cx = x;
            this.cy = y;

            this.eventManager.trigger(CharEvent.COORDINATE_CHANGE, {
                cx: x,
                cy: y
            })
        }
	};
	module.exports = PlayerModel;
});
