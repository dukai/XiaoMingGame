define(function(require, exports, module){
	var Kinetic = require('kinetic');
	var oo = require('xiaoming/oo');
	var AbstractChar = require('./abstract-char');
	var resourceLoader = require('xiaoming/resource-loader');
    var CharType = require('app/models/chars/char-type');

	var Pastor = function(options){
		this._initPastor(options);
	};

    Pastor.prototype = {
		_initPastor: function(options){
			this.options = oo.mix({
				image: resourceLoader.get('pastor'),
				darkImage: resourceLoader.get('pastor_dark'),
				fixX: -0,
				fixY: -16,
				defaultAnimation: 'idle',
				frameRate: 8,
				index: 0,
				cx: 0,
				cy: 0,
				animation: {
					idle: [
						{x: 0, y: 0, width: 28, height: 44},
						{x: 0, y: 44, width: 28, height: 44},
						{x: 0, y: 88, width: 28, height: 44},
						{x: 0, y: 132, width: 28, height: 44},
						{x: 0, y: 176, width: 28, height: 44},
						{x: 0, y: 220, width: 28, height: 44},
						{x: 0, y: 264, width: 28, height: 44},
                        {x: 0, y: 308, width: 28, height: 44}
					],
					atk: [
						{x: 28, y: 0, width:56, height:60},
						{x: 28, y: 60, width:56, height:60},
						{x: 28, y: 120, width:56, height:60},
						{x: 28, y: 180, width:56, height:60},
						{x: 28, y: 240, width:56, height:60},
						{x: 28, y: 300, width:56, height:60},
						{x: 28, y: 360, width:56, height:60},
						{x: 28, y: 420, width:56, height:60},
						{x: 28, y: 480, width:56, height:60},
						{x: 28, y: 540, width:56, height:60}
					],
					dead: [
						{x: 84, y: 0, width:52, height:44},
						{x: 84, y: 44, width:52, height:44},
						{x: 84, y: 88, width:52, height:44},
						{x: 84, y: 132, width:52, height:44},
						{x: 84, y: 176, width:52, height:44},
                        {x: 84, y: 220, width:52, height:44}
					]
				}
			}, this.options);
			AbstractChar.call(this, options);
		},

        changeIdColor: function(idColorType){
            switch (idColorType){
                case CharType.idColorType.blue:
                    this.body.setImage(resourceLoader.get('pastor'));
                    this.setImage(resourceLoader.get('pastor'));
                    this.setDarkImage(resourceLoader.get('pastor_dark'));
                    break;
                case CharType.idColorType.red:
                    this.body.setImage(resourceLoader.get('pastor'));
                    this.setImage(resourceLoader.get('pastor'));
                    this.setDarkImage(resourceLoader.get('pastor_dark'));
                    break;
                default :
                    this.body.setImage(resourceLoader.get('pastor'));
                    break;
            }

        }
	};

    Kinetic.Util.extend(Pastor, AbstractChar);

    module.exports = Pastor;
});
