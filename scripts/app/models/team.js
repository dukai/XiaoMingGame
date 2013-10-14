define(function(require, exports, module){
    var oo = require('xiaoming/oo');
    var Util = require('xiaoming/util');
	var HitMap = require('xiaoming/map/hit-map');
    var CharEvent = require('app/models/chars/char-event');

    var Team =function(options){
        this._initTeam(options);
    };

    Team.prototype = {
        _initTeam: function(options){
            this.options = oo.mix({
	            map: []
            }, this.options);
            this.options = oo.mix(this.options, options);
            this.chars = [];
            this.charsHashMap = {};
        },

        add: function(char){
            if(Util.indexOf(this.chars, char) < 0){
	            char.team = this;
                this.chars.push(char);
                this.charsHashMap[char.getHashCode()] = char;
                char.eventManager.addEventListener(CharEvent.COORDINATE_CHANGE, this.onCoordinateChange, this);
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

	    getHitMap:function(){
		    var mapCopy = this.options.map.clone();
		    var hitMap = new HitMap(mapCopy);
		    for(var key in this.charsHashMap){
			    var coordinate = Util.hashCode2Pos(key);
			    hitMap.set(coordinate.x, coordinate.y, 1);
		    }

		    return hitMap;
	    }
    };

    module.exports = Team;
});