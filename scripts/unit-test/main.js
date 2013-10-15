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
		},

        showMsg: function(event){
            console.log(event);
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
    pm.setCoordinate(1, 1);
    pm2.setCoordinate(2,2);
	console.log(pm.name);
	console.log(pm2.name);

	pm.equip(Equipment.type.head, h);
	pm.equip(Equipment.type.weaponMain, sword);
	pm.attack(pm2);

	console.log(pm);

	var cptSwordman = require('app/components/chars/swordman');
	console.log(new cptSwordman());

    console.log('=====测试数组Index======');
    var chars = [];
    chars.push(pm);
    chars.push(pm2);
    console.log(chars.indexOf(pm) === 0);
    console.log(chars.indexOf(pm2) === 1);

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

    console.log('======测试Team======');

    var Team = require('app/models/team');
    var team = new Team({
	    map: map
    });
    team.add(pm);
    team.add(pm);
    team.add(pm2);
    console.log(team);
    pm.setCoordinate(3,3);
    console.log(team);
	//printMap(team.getHitMap().map);

    console.log('=====测试EventManager======');
    var CharEvent = require('app/models/chars/char-event');
    var classa = new ClassA();
    pm.eventManager.addEventListener(CharEvent.COORDINATE_CHANGE, classa.showMsg, classa);
    pm.setCoordinate(10, 20, true);
    pm.eventManager.removeEventListener(CharEvent.COORDINATE_CHANGE, classa.showMsg);
    pm.setCoordinate(11, 21, true);
    console.log(pm);
	console.log('======测试Char Action======');
	var Attack = require('app/models/chars/actions/attack');
	var Heal = require('app/models/chars/actions/heal');
	var attackAction = new Attack();
	var healAction = new Heal();
	attackAction.execute(pm, pm2);

	healAction.execute(pm, pm2);
});