define(function(require, exports, module){
	var oo = require('xiaoming/oo');
	var Equipment = require('app/models/equipments/equipment');
	var ClassA = function(options){
		this._initClassA(options);
	};
	
	ClassA.prototype = {
		_initClassA: function(options){
			this.options = oo.mix(this.options,{
				ao1: 'ao1'
			});
			
			for(var key in options){
				this.options[key] = options[key];
			}
			
			this.name = 'ClassA';
		}
	};
	var ClassB = function(options){
		this._initClassB(options);
	};
	ClassB.prototype = {
		_initClassB: function(options){
			this.options = oo.mix(this.options, {
				bo1: 'bo1'
			});
			ClassA.call(this, options);
			this.name = 'ClassB';
		}
	};
	
	oo.extend(ClassB, ClassA);
	
	var b = new ClassB({
		o1: 'o1',
		o2: 'o2'
	});
	
	var PlayerModel = require('app/models/players/player-model');
	
	var pm = new PlayerModel();
	console.log(pm);
	
	var HelmetFactory = require('app/models/equipments/helmet');
	var h = HelmetFactory.create(Equipment.armorType.cloth);
	console.log(h);
});