define(function(require, exports, module){
    var CharType = require('./char-type');
    var Swordman = require('./swordman');
	var Archer = require('./archer');
    var Pastor = require('./pastor');

    var CharFactory = {

        characterClasses: {
        },

        createCharacter: function(characterType){
            var refClass = this.characterClasses[characterType];
            return new refClass();
        },

        registClass: function(key, value){
            this.characterClasses[key] = value;
        }
    };

    CharFactory.registClass(CharType.roleType.swordman, Swordman);
	CharFactory.registClass(CharType.roleType.archer, Archer);
    CharFactory.registClass(CharType.roleType.pastor, Pastor);
    module.exports = CharFactory;
});