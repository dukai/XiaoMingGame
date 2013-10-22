define(function(require, exports, module){
	var $c = require('xiaoming/elements');
	var oo = require('xiaoming/oo');
	var Kinetic = require('kinetic');
	var AbstractView = require('xiaoming/abstract-view');
	var resourceLoader = require('xiaoming/resource-loader');
	
	var TiledMap = require('app/components/tiled-map');
    var RangeGrid = require('app/components/range-grid');
	var PopMenu = require('app/components/pop-menu');
    var DialogFix =require('app/components/dialog-fix');
	var InfoBoard = require('app/components/info-board');

	var GameMainView = function(options){
		this._initGameMainView(options);
	};
	
	GameMainView.prototype = {
		_initGameMainView: function(options){
			AbstractView.call(this, options);
		},
		
		initUI: function(){
			var self = this;
			var stage = this.stage = new Kinetic.Stage({
			    container: this.container,
				width: 960,
				height: 640
			});
			var map = new TiledMap({
				x:0,
				y:0,
                tmxMapParser: this.options.data.tmxMapParser,
				resourceLoader: resourceLoader
			});
			this.uiLayer = new Kinetic.Layer({
				x:0,
				y:0,
				width:960,
				height:640
			});
			//初始化地图图层
			this.layer = new  Kinetic.Layer({
				draggable: true,
				dragBoundFunc: function(pos){
					var y = pos.y < stage.getHeight() - map.getHeight() ? stage.getHeight() - map.getHeight() : pos.y;
					var x = pos.x < stage.getWidth() - map.getWidth() ? stage.getWidth() - map.getWidth() : pos.x;
					if(y > 0){
						y = 0;
					}
					if(x > 0){
						x = 0;
					}
					return {x: x,y: y};
				}
			});

            this.moveRange = new RangeGrid({
                x: 0,
                y: 0,
                width:100,
                height:100,
                rangeList: [],
                fill: RangeGrid.colorType.green
            });
            this.attackRange = new RangeGrid({
                x: 0,
                y: 0,
                width:100,
                height:100,
                rangeList: [],
                fill: RangeGrid.colorType.red
            });
			this.charsGroup = new Kinetic.Group();
			this.layer.add(map);
			this.layer.add(this.moveRange);
			this.layer.add(this.attackRange);
			this.layer.add(this.charsGroup);
			this.popMenu = new PopMenu({
				x: 32,
				y: 32,
				itemsList: []
			});
			//this.popMenu.hide();
			this.layer.add(this.popMenu);
            this.roundOverBg = new Kinetic.Rect({
                x: 0,
                y: 300,
                width:960,
                height:0,
                fill: 'rgba(0,0,0,.5)',
                visible: false
            });
            this.uiLayer.add(this.roundOverBg);
            this.roundOverText = new Kinetic.Text({
                x: 0,
                y: 280,
                width:960,
                height:200,
                text : '回合结束',
                fontSize: 36,
                fontFamily: "Microsoft YaHei",
                fontStyle: 'bold',
                shadowColor: '#000000',
                shadowOffsetX: 2,
                shadowOffsetY: 2,
                fill: '#fff',
                align : 'center',
                listening : false,
                visible: false,
                opacity:0
            });
            this.uiLayer.add(this.roundOverText);

            var dialog = new DialogFix({
                messages:[
                    {
                        content: '这个游戏的名字叫小明，讲的是一个小明的故事。'
                    },
                    {
                        content: '大叔你好，我是你大爷！\n快来玩吧小伙伴！'
                    },
                    {
                        content: '大爷啊，大爷！就是大爷！\n快来玩吧小伙伴！'
                    },
                    {
                        content: '对，我还没叨叨完！\n快来玩吧小伙伴！'
                    },
                    {
                        content: '很快就完了！\n快来玩吧小伙伴！'
                    },
                    {
                        content: '这次是真的说完了！\n快来玩吧小伙伴！'
                    }
                ]
            });
            //this.uiLayer.add(dialog);
			this.infoBoard = new InfoBoard({
				y: 520,
				visible: false
			});
			this.uiLayer.add(this.infoBoard);



			stage.add(this.layer);
			stage.add(this.uiLayer);
			var btnAtk = $c('div', null, 'atk');
			btnAtk.innerHTML = '结束回合';
			this.container.appendChild(btnAtk);

			$(btnAtk).click(function(){
				self.getEventManager().trigger(GameMainView.EVENT_ATK_CLICK, {	});
                self.roundOverEffect();
			});

			this._initEvents();
		},
		//更新信息提示板
		updateInfoBoard: function(char){
			if(char == null){
				this.infoBoard.hide();
			}else{
				this.infoBoard.setName(char.name);
				this.infoBoard.setHP(char.hitPointActual, char.actualProperties.hitPoint);
				this.infoBoard.setEXP(char.exp.currentLevelExp, char.exp.getLevelExp(char.level, true));
				this.infoBoard.setAttact(char.actualProperties.attackPower);
				this.infoBoard.setArmor(char.actualProperties.physicalArmor);
				this.infoBoard.show();
			}
			this.uiLayer.batchDraw();
		},

        roundOverEffect: function(){
            var self = this;
            this.roundOverBg.show();
            this.roundOverText.show();
            var tween = new Kinetic.Tween({
                node: this.roundOverBg,
                height: 200,
                y:200,
                duration:.5,
                easing: Kinetic.Easings.EaseOut
            });
            tween.play();


            var textTween = new Kinetic.Tween({
                node: this.roundOverText,
                opacity: 1,
                duration: .5,
                easing: Kinetic.Easings.EaseOut
            });
            textTween.play();

            setTimeout(function(){
                tween.reverse();
                textTween.reverse();
                setTimeout(function(){
                    self.roundOverBg.hide();
                    self.roundOverText.hide();
                }, 1500);
            }, 1500);
        },

		_initEvents: function(){
			var self = this;
			this.layer.on('click', function(e){
				var offsetX = this.getX();
				var offsetY = this.getY();
				var mpos = {x: e.layerX, y: e.layerY};
				self.getEventManager().trigger(GameMainView.EVENT_LAYER_CLICK, {
                    coordinate : self.getCoordinate(mpos.x, mpos.y, offsetX, offsetY)
                });
			});
		},
        //根据像素获取坐标
		getCoordinate: function(x, y, offsetX, offsetY){
			var posInLayer = {
				x: x - offsetX,
				y: y - offsetY
			};
			return {
				x: ~~(posInLayer.x / 32),
				y: ~~(posInLayer.y / 32)
			};

		},
		//显示移动范围
        showMoveRange: function(rangeList){
            this.moveRange.setRangeList(rangeList);
        },
		//隐藏移动范围
        hideMoveRange: function(){
            this.moveRange.setRangeList([]);
        },
		//显示移动范围事件
		onShowMoveRange: function(event){
			this.showMoveRange(event.rangeList);
		},
		//隐藏移动范围事件
		onHideMoveRange: function(event){
			this.hideMoveRange();
		},

        //显示攻击范围事件
        onShowAttackRange: function(event){
            this.attackRange.setRangeList(event.rangeList);
            this.attackRange.show();
        },
        //隐藏攻击范围事件
        onHideAttackRange: function(event){
            this.attackRange.setRangeList([]);
            this.attackRange.hide();
        },

        //当显示菜单时
		onShowMenu:function(event){
			this.popMenu.setX(event.x * 32);
			this.popMenu.setY(event.y * 32);
			this.popMenu.setItemsList(event.itemsList);
			this.popMenu.show();
		},
        //隐藏菜单事件
		onHideMenu: function(event){
			this.popMenu.hide();
		}
	};
	
	GameMainView.EVENT_SUBMIT = 'game-main-view-submit';
	GameMainView.EVENT_LAYER_CLICK = 'game-main-view-layer-click';
	GameMainView.EVENT_ATK_CLICK = 'game-main-view-atk-click';
	oo.extend(GameMainView, AbstractView);
	
	module.exports = GameMainView;
});