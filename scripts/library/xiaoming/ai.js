define(function(require, exports, module){
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

        run: function(){
            var char = this.getNext();
            var target = this.getTarget();
            var i = 0;
            setInterval(function(){
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
                        char.status.execute(char, {
                            coordinate: {
                                x: 15,
                                y: 8
                            }
                        });
                        break;
                    case 2:
                        char.status.execute(char, {
                            action: 'attack'
                        });
                        break;
                    case 3:
                        char.status.execute(char, {
                            coordinate: {
                                x: 14,
                                y: 8
                            }
                        });
                        break;
                    case 4:
                        break;
                }

                i++;
            }, 1000);

        }
    };

    module.exports = AI;
});