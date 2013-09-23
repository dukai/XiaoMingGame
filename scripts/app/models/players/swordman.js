define(function(require, exports, module){
	var PlayerModel = require('./player-model');
	var oo = require('xiaoming/oo');
	var Swordman = function(options){
		this._initSwordman(options);
	};
	
	Swordman.prototype = {
		_initSwordman: function(options){
			PlayerModel.call(this, options);
		}
	};

	oo.extend(Swordman, PlayerModel);
});
