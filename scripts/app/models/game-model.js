define(function(require, exports, module){
	var oo = require('xiaoming/oo');
	var GameModel = function(options){
		this._initGameModel(options);
	};
	
	GameModel.prototype = {
		_initGameModel: function(options){
			this.options = oo.mix({

			}, this.options);
			this.options = oo.mix(this.options, options);
			this.chars = [];
			this.charsHashMap = [];
			this.enemies = [];
			this.enemiesHashMap = {};
			this.activedChar = null;
		}
	};

	module.exports = GameModel;
});
