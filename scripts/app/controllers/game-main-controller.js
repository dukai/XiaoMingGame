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
	
	var GameMainController = function(options){
		this._initGameMainController(options);
	};
	
	GameMainController.prototype = {
		_initGameMainController: function(options){
			AbstractController.call(this, options);
			this.gameModel = new GameModel();

            this.player1 = CharFactory.createCharacter(CharType.roleType.swordman);
            this.player1.setCoordinate(16, 8);
            this.player2 = CharFactory.createCharacter(CharType.roleType.swordman);
            this.player2.setCoordinate(17, 9);
            this.player2.idColor = CharType.idColorType.red;
            this.gameModel.addChar(this.player1);
            this.gameModel.addChar(this.player2);
            this.gameModel.addEnemies(this.player2);

            this.addViewData({
                tmxMapParser: new TmxMapParser({
                    mapData: resourceLoader.get('v2_map')
                })
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
            for(var i = 0, len = this.gameModel.chars.length; i< len; i++){
                var char = this.gameModel.chars[i];
                var ctpPlayer = CPTCharFactory.createCharacter(char.charType);
                this.get('view').layer.add(ctpPlayer);
                ctpPlayer.changeIdColor(char.idColor);
                ctpPlayer.start();
                ctpPlayer.setCoordinate(char.cx, char.cy);
                char.eventManager.addEventListener(CharEvent.COORDINATE_CHANGE, ctpPlayer.onCoordinateChange, ctpPlayer);
	            char.eventManager.addEventListener(CharEvent.STATUS_WAITING, ctpPlayer.onWaiting, ctpPlayer);
	            char.eventManager.addEventListener(CharEvent.SHOW_MOVE_RANGE, this.get('view').onShowMoveRange, this.get('view'));
	            char.eventManager.addEventListener(CharEvent.HIDE_MOVE_RANGE, this.get('view').onHideMoveRange, this.get('view'));
	            char.eventManager.addEventListener(CharEvent.SHOW_MENU, this.get('view').onShowMenu, this.get('view'));
	            char.eventManager.addEventListener(CharEvent.HIDE_MENU, this.get('view').onHideMenu, this.get('view'));
            }

		},

        onLayerClick: function(e){
            //console.log(e);
            //如果不存在activedChar判断点击位置
            if(!this.gameModel.activedChar){
                var hashKey = Util.posHashCode(e.coordinate.x, e.coordinate.y);
                if(this.gameModel.charsHashMap[hashKey] && this.gameModel.charsHashMap[hashKey].status != CharStatus.WAITING){
                    this.gameModel.activedChar = this.gameModel.charsHashMap[hashKey];
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
            delete this.gameModel.charsHashMap[this.gameModel.chars[0].getHashCode()];
            delete this.gameModel.charsHashMap[this.gameModel.chars[1].getHashCode()];
            this.gameModel.chars[0].setCoordinate(14, 8);
            this.gameModel.chars[1].setCoordinate(13, 6);

            this.gameModel.charsHashMap[this.gameModel.chars[0].getHashCode()] = this.gameModel.chars[0];
            this.gameModel.charsHashMap[this.gameModel.chars[1].getHashCode()] = this.gameModel.chars[1];
		}
		
	};
	oo.extend(GameMainController, AbstractController);
	module.exports = GameMainController;
});
