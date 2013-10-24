define(function(require, exports, module){
	var Kinetic = require('kinetic');
	var oo = require('xiaoming/oo');
	var AbstractChar = require('./abstract-char');
	var resourceLoader = require('xiaoming/resource-loader');

	var Archer = function(options){
		this._initArcher(options);
	};

	Archer.prototype = {
		_initArcher: function(options){
			this.options = oo.mix({
				image: resourceLoader.get('archer'),
				darkImage: resourceLoader.get('archer_dark'),
				fixX: -8,
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
						{x: 0, y: 288, width: 36, height: 48},
						{x: 0, y: 336, width: 36, height: 48}
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
		}

	};

    Kinetic.Util.extend(Archer, AbstractChar);

    module.exports = Archer;
});
