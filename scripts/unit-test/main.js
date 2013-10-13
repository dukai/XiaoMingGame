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

	var cptSwordman = require('app/components/chars/swordman');
	console.log(new cptSwordman());


	console.log('======测试PathRange 1======');

	var PathRange = require('xiaoming/map/path-range');
	var HitMap = require('xiaoming/map/hit-map');
	var printMap = function(map){
		for(var i = 0, len = map.length; i < len; i++){
			console.log(map[i].join(', '));
		}
	}

	var setRange = function(range, map){
		for(var i = 0, len = range.length; i < len; i++){
			map[range[i].y][range[i].x] = 8;
		}
	}

	var map = [
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0]
	];



	var hitMap = new HitMap(map);
	var center = new PathRange.Node(3, 3, 1);
	var pr = new PathRange.PathRange();
	console.log(pr.getRange(center, hitMap).length == 4);
	console.log('======测试PathRange 2======');
	var center = new PathRange.Node(3, 3, 2);
	var range2 = pr.getRange(center, hitMap);
	console.log(range2.length == 11);
	setRange(range2, map);


	printMap(map);
});