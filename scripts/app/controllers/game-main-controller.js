define(function(require, exports, module){
	var GameMainView = require('app/views/game-main-view');
	var AbstractController = require('xiaoming/abstract-controller');
	var oo = require('xiaoming/oo');
	var resourceLoader = require('xiaoming/resource-loader');
	var GameModel = require('app/models/game-model');
    var CharType = require('app/models/chars/char-type');
    var CharFactory = require('app/models/chars/char-factory');
    var CPTCharFactory = require('app/components/chars/char-factory');
    var CharEvent = require('app/models/chars/char-event');
    var CharStatus = require('app/models/chars/char-status');
	
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
            }

		},

        onLayerClick: function(e){
            //console.log(e);
            if(!this.gameModel.activedChar){
                var hashKey = e.coordinate.x.toString() + e.coordinate.y.toString();
                if(this.gameModel.chars[hashKey] && this.gameModel.chars[hashKey].status != CharStatus.WAITING){
                    this.gameModel.activedChar = this.gameModel.chars[hashKey];
                }
            }else{
                if(this.gameModel.activedChar.cx == e.coordinate.x && this.gameModel.activedChar.cy == e.coordinate.y){

                }
            }
        },

		onAtkClick: function(e){
			//this.cptPlayer1.attack();
            this.gameModel.chars[0].setCoordinate(14, 8);
            this.gameModel.chars[1].setCoordinate(13, 6);
		}
		
	};
	oo.extend(GameMainController, AbstractController);
	module.exports = GameMainController;
});
