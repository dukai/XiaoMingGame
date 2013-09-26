define(function(require, exports, module){
	var Kinetic = require('kinetic');
	var oo = require('xiaoming/oo');
	var resourceLoader = require('xiaoming/resource-loader');

	var Swordman = function(options){
		this._initSwordman(options);
	};
	
	Swordman.prototype = {
		_initSwordman: function(options){
			options = oo.mix({
				image: resourceLoader.get('solider'),
				offsetX: -8,
				offsetY: -16,
				defalutAnimation: 'idle',
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
					]
				}
			}, options);
            Kinetic.Group.call(this, options);

			this.body = new Kinetic.Sprite({
				x: this.getRealPos(this.getCx(), this.getOffsetX()),
				y: this.getRealPos(this.getCy(), this.getOffsetY()),
				image: this.getImage(),
				animation: this.getDefalutAnimation(),
				animations: this.getAnimation(),
				frameRate: this.getFrameRate(),
				index: this.getIndex(),
				drawHitFunc: function(canvas){
					var context = canvas.getContext();
					context.beginPath();
					context.rect(8, 16, 32, 32);
					context.closePath();
					canvas.fillStroke(this);
				}
			});

			this.add(this.body);
		},

		getRealPos: function(c, offset){
			return c * 32 + offset;
		},

		start: function(){
			this.body.start();
		},

		setCx: function(value){
			this.attrs.cx = value;
			this.body && this.body.setX(this.getRealPos(value, this.getOffsetX()));
		},

		setCy: function(value){
			this.attrs.cy = value;
			this.body && this.body.setY(this.getRealPos(value, this.getOffsetY()));
		},

		setCoordinate: function(x, y){
			this.setCx(x);
			this.setCy(y);
		}
	};

    Kinetic.Global.extend(Swordman, Kinetic.Group);
    Kinetic.Node.addGetterSetter(Swordman, 'image');
	Kinetic.Node.addGetterSetter(Swordman, 'offsetX');
	Kinetic.Node.addGetterSetter(Swordman, 'offsetY');
	Kinetic.Node.addGetter(Swordman, 'cx');
	Kinetic.Node.addGetter(Swordman, 'cy');
	Kinetic.Node.addGetterSetter(Swordman, 'defalutAnimation');
	Kinetic.Node.addGetterSetter(Swordman, 'frameRate');
	Kinetic.Node.addGetterSetter(Swordman, 'index');
	Kinetic.Node.addGetterSetter(Swordman, 'animation');

    module.exports = Swordman;
});
