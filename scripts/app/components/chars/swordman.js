define(function(require, exports, module){
	var Kinetic = require('kinetic');
	var oo = require('xiaoming/oo');
	var AbstractChar = require('./abstract-char');


	var Swordman = function(options){
		this._initSwordman(options);
	};
	
	Swordman.prototype = {
		_initSwordman: function(options){
			this.options = oo.mix({
			}, options);
			AbstractChar.call(this, this.options);
		}

	};

    Kinetic.Util.extend(Swordman, AbstractChar);

    module.exports = Swordman;
});
