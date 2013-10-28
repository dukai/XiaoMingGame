define(function(require, exports, module){
	var GameMainView = require('app/views/game-main-view');
	var Util = require('xiaoming/util');
	var AbstractController = require('xiaoming/abstract-controller');
	var oo = require('xiaoming/oo');
	var resourceLoader = require('xiaoming/resource-loader');
	var GameModel = require('app/models/game-model');
    var CharType = require('app/models/chars/char-type');
    var CharFactory = require('app/models/chars/char-factory');
    var CPTCharFactory = require('app/components/chars/char-factory');
    var CharEvent = require('app/models/chars/char-event');
    var CharStatus = require('app/models/chars/char-status');
    var TmxMapParser = require('xiaoming/tmx-map-parser');
	var Team = require('app/models/team');
    var AI = require('xiaoming/ai');

	var GameMainController = function(options){
		this._initGameMainController(options);
	};
	
	GameMainController.prototype = {
		_initGameMainController: function(options){
			AbstractController.call(this, options);

            var tmxMapParser = new TmxMapParser({
                mapData: resourceLoader.get('v2_map')
            });
			this.gameModel = new GameModel({
				mapData: tmxMapParser.getHitMap()
			});
			this.gameModel.ourTeam = new Team({
				idColor: CharType.idColorType.blue
			});
			this.gameModel.enemyTeam = new Team({
				idColor: CharType.idColorType.red
			});
			var ourTeamData = [
				{
					type: CharType.roleType.swordman,
					coordinate: {x: 10, y: 5}
				},
				{
					type: CharType.roleType.archer,
					coordinate: {x: 10, y: 6}
				},
				{
					type: CharType.roleType.swordman,
					coordinate: {x: 10, y: 7}
				}
			];
			var enemyTeamData = [];

			for(var i = 0, len = ourTeamData.length; i < len; i++){
				var p = CharFactory.createCharacter(ourTeamData[i].type);
				p.setCoordinate(ourTeamData[i].coordinate.x, ourTeamData[i].coordinate.y);
				p.gameModel = this.gameModel;
				this.gameModel.ourTeam.add(p);
			}

            this.player2 = CharFactory.createCharacter(CharType.roleType.swordman);
            this.player2.setCoordinate(17, 9);
			this.player2.gameModel = this.gameModel;

			this.player3 = CharFactory.createCharacter(CharType.roleType.swordman);
			this.player3.setCoordinate(18, 10);
			this.player3.gameModel = this.gameModel;

			this.gameModel.enemyTeam.add(this.player2);
			this.gameModel.enemyTeam.add(this.player3);
            this.AI = AI;
            this.AI.setEnemyTeam(this.gameModel.enemyTeam);
            this.AI.setOurTeam(this.gameModel.ourTeam);
			this.AI.setGameModel(this.gameModel);
            this.addViewData({
                tmxMapParser: tmxMapParser
            })
		},
		
		initEvents: function(){
			this.get('eventManager').addEventListener(GameMainView.EVENT_LAYER_CLICK, this.onLayerClick, this);
			this.get('eventManager').addEventListener(GameMainView.EVENT_ATK_CLICK, this.onAtkClick, this);
		},

		onRender: function(){
            /*
            var image = new Kinetic.Image({
                x: 0,
                y: 0,
                image: resourceLoader.get('forest'),
                width: 512,
                height: 512
            });
            this.get('view').layer.add(image);
            */
            for(var i = 0, len = this.gameModel.ourTeam.chars.length; i< len; i++){
                var char = this.gameModel.ourTeam.chars[i];
                var ctpPlayer = CPTCharFactory.createCharacter(char.charType);
                this.get('view').charsGroup.add(ctpPlayer);
                ctpPlayer.changeIdColor(char.idColor);
                ctpPlayer.start();
                ctpPlayer.setCoordinate(char.cx, char.cy);
                char.eventManager.addEventListener(CharEvent.COORDINATE_CHANGE, ctpPlayer.onCoordinateChange, ctpPlayer);
                char.eventManager.addEventListener(CharEvent.STATUS_ACTIVE, ctpPlayer.onActive, ctpPlayer);
                char.eventManager.addEventListener(CharEvent.STATUS_WAITING, ctpPlayer.onWaiting, ctpPlayer);
                char.eventManager.addEventListener(CharEvent.STATUS_NORMAL, ctpPlayer.onNormal, ctpPlayer);
                char.eventManager.addEventListener(CharEvent.ATTACK, ctpPlayer.onAttack, ctpPlayer);
                char.eventManager.addEventListener(CharEvent.ATTACK_OTHER_CHAR, this.gameModel.onAttack, this.gameModel);
	            char.eventManager.addEventListener(CharEvent.SHOW_MOVE_RANGE, this.get('view').onShowMoveRange, this.get('view'));
	            char.eventManager.addEventListener(CharEvent.HIDE_MOVE_RANGE, this.get('view').onHideMoveRange, this.get('view'));
                char.eventManager.addEventListener(CharEvent.SHOW_ATTACK_RANGE, this.get('view').onShowAttackRange, this.get('view'));
                char.eventManager.addEventListener(CharEvent.HIDE_ATTACK_RANGE, this.get('view').onHideAttackRange, this.get('view'));
	            char.eventManager.addEventListener(CharEvent.SHOW_MENU, this.get('view').onShowMenu, this.get('view'));
	            char.eventManager.addEventListener(CharEvent.HIDE_MENU, this.get('view').onHideMenu, this.get('view'));
	            char.eventManager.addEventListener(CharEvent.DEAD, ctpPlayer.onDead, ctpPlayer);
                //注册减血事件
                char.eventManager.addEventListener(CharEvent.HIT_POINT_DECREASE, ctpPlayer.onHipPointDecrease, ctpPlayer);
            }


			for(var i = 0, len = this.gameModel.enemyTeam.chars.length; i< len; i++){
				var char = this.gameModel.enemyTeam.chars[i];
				var ctpPlayer = CPTCharFactory.createCharacter(char.charType);
				this.get('view').charsGroup.add(ctpPlayer);
				ctpPlayer.changeIdColor(char.idColor);
				ctpPlayer.start();
				ctpPlayer.setCoordinate(char.cx, char.cy);
				char.eventManager.addEventListener(CharEvent.COORDINATE_CHANGE, ctpPlayer.onCoordinateChange, ctpPlayer);
                char.eventManager.addEventListener(CharEvent.STATUS_ACTIVE, ctpPlayer.onActive, ctpPlayer);
                char.eventManager.addEventListener(CharEvent.STATUS_WAITING, ctpPlayer.onWaiting, ctpPlayer);
                char.eventManager.addEventListener(CharEvent.STATUS_NORMAL, ctpPlayer.onNormal, ctpPlayer);
                char.eventManager.addEventListener(CharEvent.ATTACK, ctpPlayer.onAttack, ctpPlayer);
                char.eventManager.addEventListener(CharEvent.ATTACK_OTHER_CHAR, this.gameModel.onAttack, this.gameModel);
                char.eventManager.addEventListener(CharEvent.SHOW_MOVE_RANGE, this.get('view').onShowMoveRange, this.get('view'));
                char.eventManager.addEventListener(CharEvent.HIDE_MOVE_RANGE, this.get('view').onHideMoveRange, this.get('view'));
                char.eventManager.addEventListener(CharEvent.SHOW_ATTACK_RANGE, this.get('view').onShowAttackRange, this.get('view'));
                char.eventManager.addEventListener(CharEvent.HIDE_ATTACK_RANGE, this.get('view').onHideAttackRange, this.get('view'));
				char.eventManager.addEventListener(CharEvent.DEAD, ctpPlayer.onDead, ctpPlayer);
                //注册减血事件
                char.eventManager.addEventListener(CharEvent.HIT_POINT_DECREASE, ctpPlayer.onHipPointDecrease, ctpPlayer);
			}
		},

        onLayerClick: function(e){

	        var hashKey = Util.pos2HashCode(e.coordinate.x, e.coordinate.y);
	        //判断点击内容，显示InfoBoard
	        if(this.gameModel.ourTeam.charsHashMap[hashKey]){
		        this.get('view').updateInfoBoard(this.gameModel.ourTeam.charsHashMap[hashKey])
	        }else if(this.gameModel.enemyTeam.charsHashMap[hashKey]){
		        this.get('view').updateInfoBoard(this.gameModel.enemyTeam.charsHashMap[hashKey])
	        }else{
		        this.get('view').updateInfoBoard(null);
	        }

	        //如果不存在activedChar判断点击位置
            if(!this.gameModel.activedChar){
                if(this.gameModel.ourTeam.charsHashMap[hashKey]){
                    this.gameModel.activedChar = this.gameModel.ourTeam.charsHashMap[hashKey];
                }else{
                    //如果点击为空白位置，退出
                    return;
                }
            }
            //如果存在activedChar
            if(this.gameModel.activedChar){
	            var activedChar = this.gameModel.activedChar;
                if(activedChar.status.execute(activedChar, {coordinate: e.coordinate})){
	                this.gameModel.activedChar = null;
                }
            }

        },

		onAtkClick: function(e){
			//this.cptPlayer1.attack();
            var self = this;
            this.AI.run(function(){
                for(var i = 0, len = self.gameModel.ourTeam.chars.length; i < len; i++){
                    self.gameModel.ourTeam.chars[i].resetStatusNormal();
                }
	            self.gameModel.activedChar = null;
            });
            /*

            */
		}
		
	};
	oo.extend(GameMainController, AbstractController);
	module.exports = GameMainController;
});
