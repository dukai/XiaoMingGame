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
	
	var Swordman = require('app/models/chars/swordman');
	var HelmetFactory = require('app/models/equipments/helmet');
	var WeaponFactory = require('app/models/equipments/weapon');
	var h = HelmetFactory.create(Equipment.armorType.cloth);
	var sword = WeaponFactory.create(Equipment.weaponType.sword);
	var pm = new Swordman();
	var pm2 = new Swordman();
	console.log(pm.name);
	console.log(pm2.name);

	pm.equip(Equipment.type.head, h);
	pm.equip(Equipment.type.weaponMain, sword);
	pm.attack(pm2);

	console.log(pm);
});