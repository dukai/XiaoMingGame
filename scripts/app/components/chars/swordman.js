define(function(require, exports, module){
	var Kinetic = require('kinetic');
	var oo = require('xiaoming/oo');
	var resourceLoader = require('xiaoming/resource-loader');
    var CharType = require('app/models/chars/char-type');
	var Swordman = function(options){
		this._initSwordman(options);
	};
	
	Swordman.prototype = {
		_initSwordman: function(options){
			options = oo.mix({
				image: resourceLoader.get('solider'),
				fixX: -8,
				fixY: -16,
				defaultAnimation: 'idle',
				frameRate: 8,
				index: 0,
				cx: 0,
				cy: 0,
				animation: {
					idle: [
						{x: 0, y: 0, width: 48, height: 48},
						{x: 0, y: 48, width: 48, height: 48},
						{x: 0, y: 96, width: 48, height: 48},
						{x: 0, y: 144, width: 48, height: 48},
						{x: 0, y: 192, width: 48, height: 48},
						{x: 0, y: 240, width: 48, height: 48},
						{x: 0, y: 288, width: 48, height: 48},
						{x: 0, y: 336, width: 48, height: 48}
					],
					atk: [
						{x: 48, y: 0, width:80, height:52},
						{x: 48, y: 52, width:80, height:52},
						{x: 48, y: 104, width:80, height:52},
						{x: 48, y: 156, width:80, height:52},
						{x: 48, y: 208, width:80, height:52},
						{x: 48, y: 260, width:80, height:52},
						{x: 48, y: 312, width:80, height:52}
					],
					dead: [
						{x: 128, y: 0, width:80, height:64},
						{x: 128, y: 64, width:80, height:64},
						{x: 128, y: 128, width:80, height:64},
						{x: 128, y: 192, width:80, height:64},
						{x: 128, y: 256, width:80, height:64},
						{x: 128, y: 320, width:80, height:64}
					],
					disable: [
						{x: 208, y: 0, width: 48, height: 48}
					]
				}
			}, options);
            Kinetic.Group.call(this, options);
			this.body = new Kinetic.Sprite({
				x: this.getFixX(),
				y: this.getFixY(),
				image: this.getImage(),
				animation: this.getDefaultAnimation(),
				animations: this.getAnimation(),
				frameRate: this.getFrameRate(),
				index: this.getIndex(),
				drawHitFunc: function(context){
					context.beginPath();
					context.rect(8, 16, 32, 32);
					context.closePath();
					context.fillStrokeShape(this);
				}
			});

			this.add(this.body);
		},

		getRealPos: function(c, offset){
			return c * 32 + offset;
		},

		changeIdColor: function(idColorType){
            switch (idColorType){
                case CharType.idColorType.blue:
                    this.body.setImage(resourceLoader.get('solider'));
                    break;
                case CharType.idColorType.red:
                    this.body.setImage(resourceLoader.get('solider_red'));
                    break;
                default :
                    this.body.setImage(resourceLoader.get('solider'));
                    break;
            }

		},
		//开始动画
		start: function(){
			this.body.start();
		},
		//设置坐标值，游戏格子坐标
		setCoordinate: function(x, y){
			this.setCx(x);
			this.setCy(y);

			this.setX(this.getRealPos(x, 0));
			this.setY(this.getRealPos(y, 0));
		},
		/**
		 * 攻击动作
		 */
		attack: function(){
			var self = this;
			this.body.setAnimation('atk');
			this.body.afterFrame(6, function() {
				self.body.setAnimation('disable');
			});
		},
		/**
		 * 翻转
		 * @param value
		 */
		flip: function(value){
			if(value == 'right'){
				this.body.setScale(1, 1);
				this.body.setOffset(0, 0);
			}

			if(value == 'left'){
				this.body.setScale(-1, 1);
				this.body.setOffset(48, 0);
			}
		},

        onCoordinateChange: function(event){
            this.setCoordinate(event.cx, event.cy);
        },

		onWaiting: function(event){
            this.body.setAnimation('disable');
		},

        onNormal: function(event){
            this.body.setAnimation('idle');
        },

        onAttack: function(event){
            this.attack();
        }
	};

    Kinetic.Util.extend(Swordman, Kinetic.Group);
    Kinetic.Factory.addGetterSetter(Swordman, 'image');
	Kinetic.Factory.addGetterSetter(Swordman, 'fixX');
	Kinetic.Factory.addGetterSetter(Swordman, 'fixY');
	Kinetic.Factory.addGetterSetter(Swordman, 'cx');
	Kinetic.Factory.addGetterSetter(Swordman, 'cy');
	Kinetic.Factory.addGetterSetter(Swordman, 'defaultAnimation');
	Kinetic.Factory.addGetterSetter(Swordman, 'frameRate');
	Kinetic.Factory.addGetterSetter(Swordman, 'index');
	Kinetic.Factory.addGetterSetter(Swordman, 'animation');

    module.exports = Swordman;
});
