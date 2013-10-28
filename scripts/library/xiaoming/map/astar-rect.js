define(function(require, exports, module){

    var Node = function(x, y){
        this.F = null;
        this.G = null;
        this.H = null;
        this.x = x;
        this.y = y;
        this.parentNode = null;
        this.passable = false;
    };

    Node.prototype = {
        offsetX: [-1, 0, 1, 0],
        offsetY: [0, 1, 0, -1],
        checkReachable : function(map){
            this.passable = map.getPassable(this.x, this.y);
            return map.getReachable(this.x, this.y);
        },

        equal : function(node){
            return this.x == node.x && this.y == node.y;
        },

        getDistance : function(node){
            var dx = Math.abs(this.x - node.x);
            var dy = Math.abs(this.y - node.y);

            return {dx: dx, dy: dy};
        },

        setH : function(node){
            var d = this.getDistance(node);
            this.H = (d.dx + d.dy) * 10;
        },
        setG : function(node){
            var g = this.getRelativeG(node);
            this.G = node.G + g;
        },
        getRelativeG : function(node){
            var d = this.getDistance(node);
            var dsum = d.dx + d.dy;
            if(dsum == 2){
                return 20;
            }else if(dsum == 1){
                return 10;
            }else if(dsum == 0){
                return 0;
            }
            return 30;
        },

        getF: function(){
            if(this.F === null){
                this.F = this.G + this.H;
            }
            return this.F;
        },

        setParent: function(node){
            this.parentNode = node;
        },
        getSurroundNodes: function(map, node){

            var nodeList = [], x, y, n;
            //if((this.x & 1) == 0 && (this.y & 1) == 0 || (this.x & 1) == 1 && (this.y & 1) == 1){
                for(var i = 0; i < 4; i++){
                    x = this.x + this.offsetX[i];
                    y = this.y + this.offsetY[i];
                    n = new Node(x, y);
                    if(node.equal(n) || n.checkReachable(map) && n.passable && !this.equal(n)){
                        nodeList.push(n);
                    }
                }
          /*  }else{
                for(var i = 3; i > 0; i--){
                    x = this.x + this.offsetX[i];
                    y = this.y + this.offsetY[i];
                    n = new Node(x, y);
                    if(node.equal(n) || n.checkReachable(map) && n.passable && !this.equal(n)){
                        nodeList.push(n);
                    }
                }
            }
		*/


            return nodeList;
        },
        print: function(){}
    };

    var NodeList = function(startNode, endNode){
        this.nodelist = [];
        this.startNode = startNode;
        this.endNode = endNode;

    };

    NodeList.prototype = {
        add : function(node){
            node.setH(this.endNode);

            this.nodelist.push(node);
        },

        remove : function(node){
            this.nodelist.splice(this.nodelist.indexOf(node), 1);
        },

        getMinPoint : function(){
            var nodeList = this.nodelist;
            var minF = nodeList[0].getF();
            var currIndex = 0;
            for(var i = 0, len = nodeList.length; i < len; i++){
                if(minF > nodeList[i].getF()){
                    minF = nodeList[i].getF();
                    currIndex = i;
                }
            }

            return nodeList.splice(currIndex, 1)[0];
        },

        getCount : function(){
            return this.nodelist.length;
        },

        exists : function(node){
            for(var i = 0, len = this.nodelist.length; i < len; i++){
                if(this.nodelist[i].equal(node)){
                    return true;
                }
            }

            return false;
        }
    };

    var NodeListTable = function(){
        this.nodeStackList = {};
        this.positionHash = {};
        this.count = 0;
        this.nodeFList = [];
    };

    NodeListTable.prototype = {
        addNode: function(node){
            this.positionHash[node.x + '' + node.y] = true;
            this.count++;
            if(!this.nodeStackList[node.getF()]){
                this.nodeStackList[node.getF()] = [];
                this.nodeFList.push(node.getF());
                this.nodeFList.sort();
            }

            this.nodeStackList[node.getF()].push(node);
        },
        getMinNode: function(){
            if(this.count > 0){
                this.count--;
                var node = this.nodeStackList[this.nodeFList[0]].pop();
                if(this.nodeStackList[this.nodeFList[0]].length == 0){
                    delete this.nodeStackList[this.nodeFList[0]];
                    this.nodeFList.shift();
                }
                return node;
            }else{
                return false;
            }
        },

        getCount: function(){
            return this.count;
        },

        exists: function(node){
            return !!this.positionHash[node.x + '' + node.y];
        }
    };

	/**
	 *  AStar 寻路工具
	 * @param map
	 * @param startNode
	 * @param endNode
	 * @constructor
	 */
    var AStar = function(map, startNode, endNode){
        this.map = map;
        this.startNode = startNode;
        this.endNode = endNode;
        //this.openList = new NodeList(startNode, endNode);
        this.openList = new NodeListTable();
        this.closeList = new NodeList(startNode, endNode);
        startNode.G = 0;
        startNode.setH(this.endNode);
        this.openList.addNode(startNode);


    };
    AStar.prototype = {
        getPath : function(){
            var map = this.map;
            var isFound = false;
            var startTime = new Date().getTime();
            var openList = this.openList;
            //var closeList = this.closeList;
            while(openList.getCount() !== 0){
                var minPoint = openList.getMinNode();
                minPoint.hasExplored = true;
                //closeList.add(minPoint);
                var surroundPoints = minPoint.getSurroundNodes(map, this.endNode);

                for(var i = 0, len = surroundPoints.length; i < len; i++){
                    var tempNode = surroundPoints[i];
                    tempNode.setH(this.endNode);
                    tempNode.print();
                    if(tempNode.equal(this.endNode)){
                        this.endNode.setParent(minPoint);
                    }
                    if(tempNode.hasExplored){
                        continue;
                    }
                    /*
                    if(closeList.exists(tempNode)){
                        continue;
                    }*/
                    if(openList.exists(tempNode)){
                        if(tempNode.getRelativeG(minPoint) < tempNode.G){
                            tempNode.setG(minPoint);
                            tempNode.setParent(minPoint);
                        }
                        continue;
                    }

                    tempNode.setG(minPoint);
                    tempNode.setParent(minPoint);

                    openList.addNode(tempNode);

                }

                if(openList.exists(this.endNode)){
                    isFound = true;
                    break;
                }
            }

            var endTime = new Date().getTime();
            this.diffTime = endTime - startTime;

            if(isFound){
                return this.endNode;
            }else{
                return false;
            }
        },
	    /**
	     * 从开始目标到结束目标的坐标序列
	     * @param node
	     * @returns {Array}
	     */
        getNodePath: function(node){
            var a = [];
            while(node.parentNode){
                a.push({x: node.x, y: node.y});
                node = node.parentNode;
            }

            return a.reverse();
        }
    };

    exports.AStar = AStar;
    exports.Node = Node;
    exports.NodeList = NodeList;

})