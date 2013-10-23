define(function(require, exports, module){
    var oo = require('xiaoming/oo');
    var Util = require('xiaoming/util');
	var HitMap = require('xiaoming/map/hit-map');
    var CharEvent = require('app/models/chars/char-event');
	var CharType = require('app/models/chars/char-type');

    var Team =function(options){
        this._initTeam(options);
    };

    Team.prototype = {
        _initTeam: function(options){
            this.options = oo.mix({
	            idColor: CharType.idColorType.blue
            }, this.options);
            this.options = oo.mix(this.options, options);
            this.chars = [];
            this.charsHashMap = {};
        },

        add: function(char){
            if(Util.indexOf(this.chars, char) < 0){
	            char.team = this;
	            char.idColor = this.options.idColor;
                this.chars.push(char);
                this.charsHashMap[char.getHashCode()] = char;
                char.eventManager.addEventListener(CharEvent.COORDINATE_CHANGE, this.onCoordinateChange, this);
	            char.eventManager.addEventListener(CharEvent.DEAD, this.onDead, this);
            }
        },

        remove: function(char){
            delete this.charsHashMap[char.getHashCode()];
            var index = Util.indexOf(this.chars, char);
            if(index > 0){
                this.chars.splice(index, 1);
                char.eventManager.removeEventListener(CharEvent.COORDINATE_CHANGE, this.onCoordinateChange);
            }
        },

        onCoordinateChange: function(event){
            delete this.charsHashMap[Util.pos2HashCode(event.ocx, event.ocy)];
            this.charsHashMap[event.target.getHashCode()] = event.target;
        },

	    onDead: function(e){
		    this.remove(e.target);
	    },

        inTeam: function(x, y){
            if(this.charsHashMap[Util.pos2HashCode(x, y)]){
                return true;
            }

            return false;
        }
    };

    module.exports = Team;
});