define(function(require, exports, module){
	var Util = require('xiaoming/util');
	var Node = function(x, y, capacity){
		this.x = x;
		this.y = y;
		this.capacity = capacity;
	};

	var PathRange = function(){
		this._initPathRange();
	};

	PathRange.prototype = {
		_initPathRange: function(){
			this.nodeHashTable = {};
			this.allNodeList = [];
			this.current = 0;
		},

		offsetX: [-1, 0, 1, 0],
		offsetY: [0, 1, 0, -1],
		//center {x, y}
		getMoveRange: function(center, hitMap){
            this.nodeHashTable = {};
            this.allNodeList = [];
            this.current = 0;
			this.hitMap = hitMap;
			this.allNodeList.push(center);
			this.nodeHashTable[Util.pos2HashCode(center.x, center.y)] = center;
			while(this.current < this.allNodeList.length){
				this.getSurround(this.allNodeList[this.current]);
				this.current++;
			}
			return this.allNodeList;
		},

		getSurround:function(node){
			for(var i = 0; i < 4; i++){
				var x = node.x + this.offsetX[i];
				var y = node.y + this.offsetY[i];
				var newNode = new Node(x, y, {max: node.capacity.max - 1});
				//如果尚未访问则添加
				if(!this.nodeHashTable[Util.pos2HashCode(x, y)] && newNode.capacity.max >= 0 && this.hitMap.getPassable(x, y)){
					this.nodeHashTable[Util.pos2HashCode(x, y)] = newNode;
					this.allNodeList.push(newNode);
				}
			}
		},

		getAttackRange: function(center, team){
			var nodeHashTable = {}, allNodeList = [], current = 0, usedList = [];
			allNodeList.push(center);
			nodeHashTable[Util.pos2HashCode(center.x, center.y)] = center;
			while(current < allNodeList.length){
				var node = allNodeList[current];
				for(var i = 0; i < 4; i++){
					var x = node.x + this.offsetX[i];
					var y = node.y + this.offsetY[i];
					var newNode = new Node(x, y, {min: node.capacity.min - 1, max: node.capacity.max - 1});
					//如果尚未访问则添加
					if(!nodeHashTable[Util.pos2HashCode(x, y)] && newNode.capacity.max >= 0 && newNode.capacity.min <= 0){
						nodeHashTable[Util.pos2HashCode(x, y)] = newNode;
						allNodeList.push(newNode);
						if(team.charsHashMap[Util.pos2HashCode(x, y)]){
							usedList.push(newNode);
						}
					}
				}

				current++;
			}

			return usedList;
		}
	};

	exports.Node = Node;
	exports.PathRange = PathRange;
});