define(function(require, exports, module){
    var oo = require('xiaoming/oo');
    var Util = require('xiaoming/util');

    var CharEvent = require('app/models/chars/char-event');

    var Team =function(options){
        this._initTeam(options);
    };

    Team.prototype = {
        _initTeam: function(options){
            this.options = oo.mix({

            }, this.options);
            this.options = oo.mix(this.options, options);

            this.chars = [];
            this.charsHashMap = {};
        },

        add: function(char){
            if(Util.indexOf(this.chars, char) < 0){
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
            }
        },

        onCoordinateChange: function(event){

        }
    };

    module.exports = Team;
});