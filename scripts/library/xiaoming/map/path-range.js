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
		getRange: function(center, hitMap){
            this.nodeHashTable = {};
            this.allNodeList = [];
            this.current = 0;
			this.hitMap = hitMap;
			this.allNodeList.push(center);
			this.nodeHashTable[Util.posHashCode(center.x, center.y)] = center;
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
				var newNode = new Node(x, y, node.capacity - 1);
				//如果尚未访问则添加
				if(!this.nodeHashTable[Util.posHashCode(x, y)] && newNode.capacity >= 0 && this.hitMap.getPassable(x, y)){
					this.nodeHashTable[Util.posHashCode(x, y)] = newNode;
					this.allNodeList.push(newNode);
				}
			}
		}
	};

	exports.Node = Node;
	exports.PathRange = PathRange;
});