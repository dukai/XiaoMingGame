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

	var GameMainController = function(options){
		this._initGameMainController(options);
	};
	
	GameMainController.prototype = {
		_initGameMainController: function(options){
			AbstractController.call(this, options);
			this.gameModel = new GameModel();
            var tmxMapParser = new TmxMapParser({
                mapData: resourceLoader.get('v2_map')
            });

			this.ourTeam = new Team();
			this.enemyTeam = new Team();

            this.player1 = CharFactory.createCharacter(CharType.roleType.swordman);
            this.player1.setCoordinate(16, 8);
            this.player2 = CharFactory.createCharacter(CharType.roleType.swordman);
            this.player2.setCoordinate(17, 9);
            this.player2.idColor = CharType.idColorType.red;

			this.ourTeam.add(this.player1);
			this.enemyTeam.add(this.player2);

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
            for(var i = 0, len = this.ourTeam.chars.length; i< len; i++){
                var char = this.ourTeam.chars[i];
                var ctpPlayer = CPTCharFactory.createCharacter(char.charType);
                this.get('view').layer.add(ctpPlayer);
                ctpPlayer.changeIdColor(char.idColor);
                ctpPlayer.start();
                ctpPlayer.setCoordinate(char.cx, char.cy);
                char.eventManager.addEventListener(CharEvent.COORDINATE_CHANGE, ctpPlayer.onCoordinateChange, ctpPlayer);
                char.eventManager.addEventListener(CharEvent.COORDINATE_CHANGE, this.onCoordinateChange, this);
	            char.eventManager.addEventListener(CharEvent.STATUS_WAITING, ctpPlayer.onWaiting, ctpPlayer);
                char.eventManager.addEventListener(CharEvent.STATUS_NORMAL, ctpPlayer.onNormal, ctpPlayer);
                char.eventManager.addEventListener(CharEvent.ATTACK_OTHER_CHAR, ctpPlayer.onAttack, ctpPlayer);
	            char.eventManager.addEventListener(CharEvent.SHOW_MOVE_RANGE, this.get('view').onShowMoveRange, this.get('view'));
	            char.eventManager.addEventListener(CharEvent.HIDE_MOVE_RANGE, this.get('view').onHideMoveRange, this.get('view'));
                char.eventManager.addEventListener(CharEvent.SHOW_ATTACK_RANGE, this.get('view').onShowAttackRange, this.get('view'));
                char.eventManager.addEventListener(CharEvent.HIDE_ATTACK_RANGE, this.get('view').onHideAttackRange, this.get('view'));
	            char.eventManager.addEventListener(CharEvent.SHOW_MENU, this.get('view').onShowMenu, this.get('view'));
	            char.eventManager.addEventListener(CharEvent.HIDE_MENU, this.get('view').onHideMenu, this.get('view'));
            }


			for(var i = 0, len = this.enemyTeam.chars.length; i< len; i++){
				var char = this.enemyTeam.chars[i];
				var ctpPlayer = CPTCharFactory.createCharacter(char.charType);
				this.get('view').layer.add(ctpPlayer);
				ctpPlayer.changeIdColor(char.idColor);
				ctpPlayer.start();
				ctpPlayer.setCoordinate(char.cx, char.cy);
				char.eventManager.addEventListener(CharEvent.COORDINATE_CHANGE, ctpPlayer.onCoordinateChange, ctpPlayer);
			}
		},

        onLayerClick: function(e){
            //console.log(e);
            //如果不存在activedChar判断点击位置
            if(!this.gameModel.activedChar){
                var hashKey = Util.pos2HashCode(e.coordinate.x, e.coordinate.y);
                if(this.ourTeam.charsHashMap[hashKey]){
                    this.gameModel.activedChar = this.ourTeam.charsHashMap[hashKey];
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
            for(var i = 0, len = this.gameModel.chars.length; i < len; i++){
                this.gameModel.chars[i].resetStatusNormal();
            }
		},
        //有角色的位置发生了改变
        onCoordinateChange: function(event){
            delete this.gameModel.charsHashMap[Util.pos2HashCode(event.ocx, event.ocy)];
            this.gameModel.charsHashMap[event.target.getHashCode()] = event.target;
        }
		
	};
	oo.extend(GameMainController, AbstractController);
	module.exports = GameMainController;
});
