define(function(require, exports, module){
    var Swordman = require('./swordman');

    var CharFactory = {
        charType: {
            swordman: 1
        },

        characterClasses: {
            1: Swordman
        },

        createCharacter: function(characterType){
            var refClass = this.characterClasses[characterType];
            return new refClass();
        }
    };

    module.exports = CharFactory;
});