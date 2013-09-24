define(function(require, exports, module){
	var Kinetic = require('kinetic');
	
	var Swordman = function(options){
		this._initSwordman(options);
	};
	
	Swordman.prototype = {
		_initSwordman: function(options){
            Kinetic.Group.call(this, options);
		}
	};

    Kinetic.Global.extend(Swordman, Kinetic.Group);
    Kinetic.Node.addGetterSetter(Swordman, 'image');
});
