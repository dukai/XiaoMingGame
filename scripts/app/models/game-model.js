define(function(require, exports, module){
	var oo = require('xiaoming/oo');
	var HitMap = require('xiaoming/map/hit-map');
	var Util = require('xiaoming/util');

	var GameModel = function(options){
		this._initGameModel(options);
	};
	
	GameModel.prototype = {
		_initGameModel: function(options){
			this.options = oo.mix({
				mapData: []
			}, this.options);
			this.options = oo.mix(this.options, options);
			this.activedChar = null;

			this.ourTeam = null;
			this.enemyTeam = null;
		},
		//获取碰撞地图
		getHitMap:function(){
			var mapCopy = this.options.mapData.clone();
			var hitMap = new HitMap(mapCopy);
			for(var key in this.ourTeam.charsHashMap){
				var coordinate = Util.hashCode2Pos(key);
				hitMap.set(coordinate.x, coordinate.y, 1);
			}

			for(var key in this.enemyTeam.charsHashMap){
				var coordinate = Util.hashCode2Pos(key);
				hitMap.set(coordinate.x, coordinate.y, 1);
			}

			return hitMap;
		},

        onAttack: function(event){
            var hashCode = Util.pos2HashCode(event.coordinate.x, event.coordinate.y);
            var attackTarget = this.getEnemyTeam(event.target.team).charsHashMap[hashCode];
            if(!attackTarget){
                attackTarget = event.target.team.charsHashMap[hashCode];
            }
            event.target.action.execute(event.target, attackTarget);
            //event.target.attack(this.enemyTeam.charsHashMap[Util.pos2HashCode(event.coordinate.x, event.coordinate.y)]);
        },

        getEnemyTeam: function(team){
            if(team == this.ourTeam){
                return this.enemyTeam;
            }else{
                return this.ourTeam;
            }
        }
	};

	module.exports = GameModel;
});
