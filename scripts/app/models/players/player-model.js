define(function(require, exports, module){
	/**
	 *人物角色.
	 * @param {string} 人物名字
	 * @param {bool} 性别，男性为true， 女性为false
	 */
	var PlayerModel = function(options){
		
		this._initPlayerModel(options);
		if(gender == undefined){
			gender = true;
		}
		if(name){
			this.name = name;
		}else{
			this.name = util.getName(gender);
		}
		
		this.gender = gender;
		//等级
		this.level = 1;
		//经验
		this.exp = new Experience();
		this.exp.getLevelExp(this.level, true);
		/**
		 *角色固有属性 
		 */
		this.p = {
			//生命值
			hitPoint : 0,
			//体能值
			stamina : 0,
			//攻击力
			attackPower : 0,
			//加血能力
			healPower : 0,
			//物理防御
			physicalArmor : 0,
			//魔法防御
			magicArmor : 0,
			//躲闪几率
			dodge : 0,
			//格挡
			block : 0,
			//暴击
			criticalStrike : 0,
			//暴击伤害比例
			criticalStrikeDamage : 2,
			//幸运值
			lucky : 0
			
		};
		this.a = {
			hitPoint : 0,
			stamina : 0,
			attackPower : 0,
			healPower : 0,
			physicalArmor : 0,
			magicArmor : 0,
			dodge : 0,
			block : 0,
			criticalStrike : 0,
			criticalStrikeDamage : 2,
			lucky : 0
		};
		this.hitPointActual = 0;
		//移动能力
		this.mobility;
		this.mobilityActual;
		//攻击范围
		this.attackRange = {min: 0, max: 0};
		//怒气值
		this.rage = 0;
		//必杀技
		this.mustKill;
		//消耗
		this.consume;
		//兵种
		this.units;
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
				code: 'serach'
			},
			await: {
				name: '待机',
				code: 'await'
			}
		};
		
	};
	
	PlayerModel.prototype = {
		_initPlayerModel: function(options){
			
		},
		/**
		 *攻击方法
		 * @param {Person} otherPerson 攻击目标 
		 * @param {bool, optional} 是否是回击
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
			var attackMsg = !!attackBack ? '发动了回击：' : '发动了攻击：' 
			debug && console.log(this.units + this.name + '对' + otherPerson.units + otherPerson.name + attackMsg);
			var damagePercent = 1;
			var dodgeTurn = Math.ceil(Math.random() * 100);
			var criticalStrikeTurn = Math.ceil(Math.random() * 100);
			//是否暴击
			if(criticalStrikeTurn <= this.a.criticalStrike * (1 + this.a.lucky) * 100){
				damagePercent = this.a.criticalStrikeDamage;
				debug && console.log(this.units + this.name + '暴击了');
			}
			//计算实际伤害
			var actualDamage = Math.ceil(((this.a.attackPower * damagePercent) - otherPerson.a.physicalArmor) * (((this.a.hitPoint - this.hitPointActual) / this.a.hitPoint) + 1));
			//是否躲避
			if(dodgeTurn <= otherPerson.a.dodge * 100){
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
			if(!attackBack && otherPerson.hitPointActual > 0 && blockTurn <= otherPerson.a.block * 100){
				
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
		 *装备武器 
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
			
			this.p.hitPoint = Math.ceil(this.p.hitPoint * 1.1);
			this.p.attackPower = Math.ceil(this.p.attackPower * 1.1);
			this.p.physicalArmor = Math.ceil(this.p.physicalArmor * 1.1);
			this.p.magicArmor = Math.ceil(this.p.magicArmor * 1.1);
			this.p.healPower = Math.ceil(this.p.healPower * 1.1);
			
			this.updateActualProperties();
		},
		
		updateActualProperties: function(){
			for(var key in this.p){
				var hpDiff = this.a.hitPoint - this.hitPointActual;
				var ep = this.equipmentsProperties[key];
				if(!ep){
					ep = 0;
				}
				this.a[key] = this.p[key] + ep;
				if(key == 'hitPoint'){
					this.hitPointActual = this.a.hitPoint - hpDiff;
				}
				
			}
		}
		
	};
	
	
});
