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
			this.charsHashMap = {};
			this.enemies = [];
			this.enemiesHashMap = {};
			this.activedChar = null;
		},

        addChar: function(char){
            this.chars.push(char);
            this.charsHashMap[char.getCx().toString() + char.getCy().toString()] = char;
        },

        addEnemies: function(char){
            this.enemies.push(char);
            this.enemiesHashMap[char.getCx().toString() + char.getCy().toString()] = char;
        }
	};

	module.exports = GameModel;
});
