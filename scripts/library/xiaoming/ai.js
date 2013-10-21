define(function(require, exports, module){
	var AStar = require('xiaoming/map/astar-rect');

    var AI = {
        enemyTeam: null,
        ourTeam: null,
        //获取下一个操作对象
        getNext: function(){
            return this.enemyTeam.chars[0];
        },
        //获取要攻击对象
        getTarget: function(){
            return this.ourTeam.chars[0];
        },
        //是否能感知到对方已决定是否开始攻击
        canSense: function(){
            return true;
        },

        setEnemyTeam: function(team){
            this.enemyTeam = team;
        },

        setOurTeam: function(team){
            this.ourTeam = team;
        },

	    setGameModel: function(gameModel){
		    this.gameModel = gameModel;
	    },

        run: function(){
            var char = this.getNext();
            var target = this.getTarget();
	        var pathFinder = new AStar.AStar(this.gameModel.getHitMap(), new AStar.Node(char.cx, char.cy), new AStar.Node(target.cx, target.cy));
            var i = 0;
            var timer = setInterval(function(){
                switch (i){
                    case 0:
                        char.status.execute(char, {
                            coordinate: {
                                x: char.cx,
                                y: char.cy
                            }
                        });
                        break;
                    case 1:
	                    var endNode = pathFinder.getPath();
	                    if(endNode){
		                    var path = pathFinder.getNodePath(endNode);
	                    }
                        char.status.execute(char, {
                            coordinate: path[char.actualProperties.mobility]
                        });
                        break;
                    case 2:
	                    char.getAttackRange();
	                    if(char.isInAttackRange(target.cx, target.cy)){
		                    char.status.execute(char, {
			                    action: 'attack'
		                    });
	                    }else{
		                    char.status.execute(char, {
			                    action: 'waiting'
		                    });
		                    i = 0;
		                    clearInterval(timer);
	                    }

                        break;
                    case 3:
                        char.status.execute(char, {
                            coordinate: {
                                x: target.cx,
                                y: target.cy
                            }
                        });
	                    i = 0;
	                    clearInterval(timer);
                        break;
                }

                i++;
            }, 1000);

        }
    };

    module.exports = AI;
});