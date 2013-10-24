define(function(require, exports, module){
	var oo = require('xiaoming/oo');
	var Util = require('xiaoming/util');
	var EquipmentsManager = require('../equipments/equipment-manager');
    var Experience = require('app/models/chars/experience');
    var CharType = require('app/models/chars/char-type');
    var EventManager = require('xiaoming/event-manager');
    var CharEvent = require('app/models/chars/char-event');
    var CharStatus = require('app/models/chars/char-statuses');
    var PathRange = require('xiaoming/map/path-range');
    var Attack = require('./actions/attack');
	var PlayerProperties = require('./player-properties');
	/**
	 * 人物角色
	 * @param options
	 * @constructor
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
				this.options.name = Util.getName(this.options.gender);
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
            this.origCoordinate = null;
            //颜色标识
            this.idColor = CharType.idColorType.blue;
            //char status
            this.status = new CharStatus.StatusNormal;
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

            this.action = new Attack();
			this.updateActualProperties();
            this.eventManager = new EventManager();
            //可移动范围,只有在active状态有效
            this.moveRange = [];
            this.attackRange = [];
            this.pathRange = new PathRange.PathRange();
			//队伍信息
			this.team = null;
			this.gameModel = null;
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
				//this.actualProperties[key] = this.inherentProperties[key] + ep;
                this.actualProperties.add(key, this.inherentProperties, ep);
				if(key == 'hitPoint'){
					this.hitPointActual = this.actualProperties.hitPoint - hpDiff;
				}
			}
		},
		getEventManager: function(){
			return this.eventManager;
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
        /**
         * 设置当前坐标
         * @param x
         * @param y
         * @param backup 是否保存原始坐标
         */
        setCoordinate: function(x, y, backup){
            var oc = {
                x : this.cx,
                y: this.cy
            };
            if(backup){
                this.origCoordinate = oc;
            }else{
                this.origCoordinate = null;
            }
            this.cx = x;
            this.cy = y;

            this.eventManager.trigger(CharEvent.COORDINATE_CHANGE, {
                cx: x,
                cy: y,
                ocx: oc.x,
                ocy: oc.y,
	            direction: {x: x - oc.x, y: y - oc.y},
                target: this
            })
        },

        restoreCoordinate: function(){
            if(this.origCoordinate != null){
                this.setCoordinate(this.origCoordinate.x, this.origCoordinate.y, false);
            }
        },

        getHashCode: function(){
	        return Util.pos2HashCode(this.cx, this.cy);
        },

        isInRange: function(x, y, range){
            for(var i = 0, len = range.length; i < len; i++){
                if(range[i].x == x && range[i].y == y){
                    return true;
                }
            }

            return false;
        },

        /**
         * 获取可移动范围
         * @returns {Array}
         */
        getMoveRange: function(){
	        var center = new PathRange.Node(this.cx, this.cy, {max: this.actualProperties.mobility});
            this.moveRange = this.pathRange.getMoveRange(center, this.gameModel.getHitMap());
            return this.moveRange;
        },

        isInMoveRange: function(x, y){
	        this.getMoveRange();
            return this.isInRange(x, y, this.moveRange);
        },
		//显示移动范围
		showMoveRange: function(){
			this.getEventManager().trigger(CharEvent.SHOW_MOVE_RANGE, {
				rangeList: this.getMoveRange()
			});
		},
		//因此移动范围
		hideMoveRange: function(){
			this.getEventManager().trigger(CharEvent.HIDE_MOVE_RANGE, {});
		},
		//显示菜单
		showMenu: function(){
            var itemsList = [];
            if(this.isEnemyInAttackRange()){
                itemsList = [
                    {
                        text: '攻击',
                        callback: function(){
                            this.status.execute(this, {
                                action: 'attack'
                            });
                        },
                        target: this
                    },
                    {
                        text: '待机',
                        callback: function(){
                            this.status.execute(this, {
                                action: 'waiting'
                            });
                        },
                        target: this
                    },
                    {
                        text: '取消',
                        callback: function(){
                            this.status.execute(this, {
                                action: 'cancel'
                            });
                        },
                        target: this
                    }];
            }else{
                itemsList = [
                    {
                        text: '待机',
                        callback: function(){
                            this.status.execute(this, {
                                action: 'waiting'
                            });
                        },
                        target: this
                    },
                    {
                        text: '取消',
                        callback: function(){
                            this.status.execute(this, {
                                action: 'cancel'
                            });
                        },
                        target: this
                    }];
            }

			this.getEventManager().trigger(CharEvent.SHOW_MENU, {
				x: this.cx + 1,
				y: this.cy,
				itemsList: itemsList
			});
		},
		//隐藏菜单
		hideMenu: function(){
			this.getEventManager().trigger(CharEvent.HIDE_MENU, {});
		},

        getAttackRange: function(){
	        var center = new PathRange.Node(this.cx, this.cy, this.actualProperties.attackRange);
	        var list = this.pathRange.getAttackRange(center, this.gameModel.getEnemyTeam(this.team));
            this.attackRange = list;
            return list;
        },

        isEnemyInAttackRange: function(){
            var list = this.getAttackRange();
            return list.length > 0;
        },

        isInAttackRange: function(x, y){
            return this.isInRange(x, y, this.attackRange);
        },

        showAttackRange: function(){
            this.getEventManager().trigger(CharEvent.SHOW_ATTACK_RANGE, {
                rangeList: this.getAttackRange()
            });
        },

        hideAttackRange: function(){
            this.getEventManager().trigger(CharEvent.HIDE_ATTACK_RANGE, {
            });
        },
        //进入待机状态
        await: function(){
	        this.gameModel.activedChar = null;
            this.origCoordinate = null;
            this.eventManager.trigger(CharEvent.STATUS_WAITING, {});
        },

		changeStatus: function(status){
			this.status.exit(this);
			this.status = status;
			this.status.enter(this);
		},

        resetStatusNormal: function(){
            this.changeStatus(new CharStatus.StatusNormal);
        }
	};
	module.exports = PlayerModel;
});
