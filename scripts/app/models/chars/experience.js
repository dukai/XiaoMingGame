define(function(require, exports, module){
    /**
     *经验管理器
     */
    var Experience = function(){
        this.levelExpList = [];
        this.levelExp = -1;
        this.currentLevelExp = 0;
        this.level = -1;
    };

    Experience.prototype = {
        /**
         *经验计算偏移量
         */
        expOffset: 40,
        /**
         *根据等级获取当前等级升级需要的总经验
         * @param {Int} 等级
         * @param {bool} 是否设为当前等级
         * @param {bool} 是否加入到经验列表
         */
        getLevelExp: function(level, isCurrentLevel, addToList){
            var totalExp = Math.ceil((Math.pow(level - 1,3) + this.expOffset ) / 10 * ((level  - 1) * 2 + this.expOffset));
            if(isCurrentLevel){
                this.level = level;
                this.levelExp = totalExp;
            }
            if(addToList){
                this.levelExpList[level] = totalExp;
            }

            return totalExp;
        },
        /**
         *获取战斗经验
         * @param {Int} 攻击者等级
         * @param {Int} 被攻击者等级
         */
        getFightExp: function(positiveLevel, negativeLevel){
            var diff = negativeLevel - positiveLevel;
            if(diff > 5){
                diff = 5;
            }

            if(diff < -5){
                return 0;
            }
            var t = Math.pow((positiveLevel - 1) , 2);
            return Math.ceil(t + (this.expOffset / 2) + (t * diff / 40));
        },
        /**
         *是否为当前等级
         * @param {Int} level
         */
        isCurrentLevel: function(level){
            return level === this.level;
        },
        updateExp: function(exp, level){
            if(!this.isCurrentLevel(level)){
                this.getLevelExp(level, true);
                this.currentLevelExp = 0;
            }

            this.currentLevelExp += exp;
            if(this.currentLevelExp >= this.levelExp){
                this.currentLevelExp -= this.levelExp;

                this.level++;
                this.getLevelExp(this.level, true);
                return true;
            }

            return false;
        }
    };

    module.exports = Experience;
});
