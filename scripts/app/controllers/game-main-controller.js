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
            //如果不存在activedChar判断点击位置
            if(!this.gameModel.activedChar){
                var hashKey = e.coordinate.x.toString() + e.coordinate.y.toString();
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
                //正常状态
                if(activedChar.status == CharStatus.NORMAL){
                    //TODO: 激活当前对象，显示可移动范围
                    activedChar.status = CharStatus.ACTIVE;
                    //activedChar.getMoveRange();
                    this.get('view').showMoveRange(activedChar.getMoveRange());
                }else if(activedChar.status == CharStatus.ACTIVE){
                    //点击了角色本身，显示菜单
                    if(activedChar.cx == e.coordinate.x && activedChar.cy == e.coordinate.y){
		                //TODO: show operation menu and remove move range
                        activedChar.status = CharStatus.MOVED;
                        this.get('view').hideMoveRange();
                        return;
	                }

                    //TODO: 点击了可移动区域，移动
                    if(activedChar.isInMoveRange(e.coordinate.x, e.coordinate.y)){
                        activedChar.status = CharStatus.MOVED;
                        activedChar.setCoordinate(e.coordinate.x, e.coordinate.y);
                        this.get('view').hideMoveRange();
                        return;
                    }
                    //TODO: 点击其他区域取消区域显示并将激活对象设置为null
                    this.get('view').hideMoveRange();
                    activedChar.status = CharStatus.NORMAL;
                    this.gameModel.activedChar = null;

                }else if(activedChar.status == CharStatus.MOVED){
                    //TODO: 移动后的状态，显示菜单，如果选择取消则返回Normal状态并返回初始位置
                    //选择攻击显示攻击范围


                }else if(activedChar.status == CharStatus.ATTACK){
                    //TODO：攻击状态，点击发动攻击，点击其他位置返回状态
                }else if(activedChar.status == CharStatus.WAITING){
                    //TODO: 无任何反应
                }else{
                    //TODO: 返回原来的位置， 将激活对象设置为null
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
