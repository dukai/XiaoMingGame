define(function(require, exports, module){
    var HitMap = function(map){
        this.map = map;
        this.width = this.map[0].length;
        this.height = this.map.length;
    };

    HitMap.prototype = {
        getWidth : function(){
            return this.width;
        },

        getHeight : function(){
            return this.height;
        },

        getPassable : function(x, y){
            if(this.getReachable(x, y)){
                return this.map[y][x] !== 1;
            }
            return true;
        },

        getReachable : function(x, y){
            if(x >= 0 && y >= 0 && x < this.getWidth() && y < this.getHeight()){
                return true;
            }

            return false;
        },

        get : function(x, y){
            return this.map[y][x];
        },

        set : function(x, y, value){
            this.map[y][x] = value;
        },

        plus: function(hitMap){
            var newMap = [];
            for(var i = 0, len = this.getHeight(); i < len; i++){
                for(var j = 0, jlen = this.getWidth(); j < jlen; j++){
                    if(j == 0){
                        newMap[i] = [];
                    }
                    newMap[i][j] = this.map[i][j] || hitMap.map[i][j];
                }
            }

            return new HitMap(newMap);
        }
    };

    module.exports = HitMap;
});