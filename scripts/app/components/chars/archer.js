define(function(require, exports, module){
	var Kinetic = require('kinetic');
	var oo = require('xiaoming/oo');
	var AbstractChar = require('./abstract-char');
	var resourceLoader = require('xiaoming/resource-loader');
    var CharType = require('app/models/chars/char-type');

	var Archer = function(options){
		this._initArcher(options);
	};

	Archer.prototype = {
		_initArcher: function(options){
			this.options = oo.mix({
				image: resourceLoader.get('archer'),
				darkImage: resourceLoader.get('archer_dark'),
				fixX: -0,
				fixY: -16,
				defaultAnimation: 'idle',
				frameRate: 8,
				index: 0,
				cx: 0,
				cy: 0,
				animation: {
					idle: [
						{x: 0, y: 0, width: 36, height: 48},
						{x: 0, y: 48, width: 36, height: 48},
						{x: 0, y: 96, width: 36, height: 48},
						{x: 0, y: 144, width: 36, height: 48},
						{x: 0, y: 192, width: 36, height: 48},
						{x: 0, y: 240, width: 36, height: 48},
						{x: 0, y: 288, width: 36, height: 48}
					],
					atk: [
						{x: 36, y: 0, width:56, height:44},
						{x: 36, y: 44, width:56, height:44},
						{x: 36, y: 88, width:56, height:44},
						{x: 36, y: 132, width:56, height:44},
						{x: 36, y: 176, width:56, height:44},
						{x: 36, y: 220, width:56, height:44},
						{x: 36, y: 264, width:56, height:44},
						{x: 36, y: 308, width:56, height:44},
						{x: 36, y: 352, width:56, height:44},
						{x: 36, y: 396, width:56, height:44}
					],
					dead: [
						{x: 92, y: 0, width:56, height:44},
						{x: 92, y: 44, width:56, height:44},
						{x: 92, y: 88, width:56, height:44},
						{x: 92, y: 132, width:56, height:44},
						{x: 92, y: 176, width:56, height:44}
					]
				}
			}, this.options);
			AbstractChar.call(this, options);
		},

        changeIdColor: function(idColorType){
            switch (idColorType){
                case CharType.idColorType.blue:
                    this.body.setImage(resourceLoader.get('archer'));
                    this.setImage(resourceLoader.get('archer'));
                    this.setDarkImage(resourceLoader.get('archer_dark'));
                    break;
                case CharType.idColorType.red:
                    this.body.setImage(resourceLoader.get('archer_red'));
                    this.setImage(resourceLoader.get('archer_red'));
                    this.setDarkImage(resourceLoader.get('archer_red_dark'));
                    break;
                default :
                    this.body.setImage(resourceLoader.get('solider'));
                    break;
            }

        },

        flip: function(value){
            if(value == 'left'){
                this.setScale(1, 1);
                this.setOffset(0, 0);
            }

            if(value == 'right'){
                this.setScale(-1, 1);
                this.setOffset(32, 0);
            }
        }
	};

    Kinetic.Util.extend(Archer, AbstractChar);

    module.exports = Archer;
});
