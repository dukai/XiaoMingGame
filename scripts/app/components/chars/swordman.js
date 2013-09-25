define(function(require, exports, module){
	var Kinetic = require('kinetic');
	var oo = require('xiaoming/oo');
	
	var Swordman = function(options){
		this._initSwordman(options);
	};
	
	Swordman.prototype = {
		_initSwordman: function(options){
			options = oo.mix({
				image: '',
				offsetX: -8,
				offsetY: -16,
				defalutAnimation: 'idle',
				frameRate: 8,
				index: 0,
				cx: 0,
				cy: 0
			}, options);
            Kinetic.Group.call(this, options);

			this.body = new Kinetic.Sprite({
				x: this.getRealPos(this.getModel().getX(), this.offsetX),
				y: this.getRealPos(this.getModel().getY(), this.offsetY),
				image: this.getImage(),
				animation: this.defaultAnimation,
				animations: this.getAnimation(),
				frameRate: this.frameRate,
				index: this.index,
				drawHitFunc: function(canvas){
					var context = canvas.getContext();
					context.beginPath();
					context.rect(8, 16, 32, 32);
					context.closePath();
					canvas.fillStroke(this);
				}
			});
		}
	};

    Kinetic.Global.extend(Swordman, Kinetic.Group);
    Kinetic.Node.addGetterSetter(Swordman, 'image');

    module.exports = Swordman;
});
