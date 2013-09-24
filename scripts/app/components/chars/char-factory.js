define(function(require, exports, module){
    var Swordman = require('./swordman');

    var CharFactory = {
        charType: {
            swordman: 1
        },

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

    CharFactory.registClass(CharFactory.charType.swordman, Swordman);



    module.exports = CharFactory;
});