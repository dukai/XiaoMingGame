define(function(require, exports, module){

	var oo = require('xiaoming/oo');
	var CharAction = require('app/models/chars/actions/char-action');
    var CharEvent = require('app/models/chars/char-event');

	var Attack = function(options){
		this._initAttack(options);
	};

	Attack.prototype = {
		_initAttack:function(options){
			this.options = oo.mix({}, this.options);
			CharAction.call(this, options);
		},
		execute: function(pChar, nChar){
            pChar.eventManager.trigger(CharEvent.ATTACK, {});
			var attackBack = false;
			var debug = true;
			if(pChar.hitPointActual === 0){
				debug && console.log('你已经阵亡了，节哀顺便');
				return;
			}
			if(nChar.hitPointActual === 0){
				debug && console.log("鞭尸不是好习惯，道德点减10");
				return;
			}
			var attackMsg = !!attackBack ? '发动了回击：' : '发动了攻击：';
			debug && console.log(pChar.units + pChar.name + '对' + nChar.units + nChar.name + attackMsg);
			var damagePercent = 1;
			var dodgeTurn = Math.ceil(Math.random() * 100);
			var criticalStrikeTurn = Math.ceil(Math.random() * 100);
			//是否暴击
			if(criticalStrikeTurn <= pChar.actualProperties.criticalStrike * (1 + pChar.actualProperties.lucky) * 100){
				damagePercent = pChar.actualProperties.criticalStrikeDamage;
				debug && console.log(pChar.units + pChar.name + '暴击了');
			}
			//计算实际伤害
			var actualDamage = Math.ceil(((pChar.actualProperties.attackPower * damagePercent) - nChar.actualProperties.physicalArmor) * (((pChar.actualProperties.hitPoint - pChar.hitPointActual) / pChar.actualProperties.hitPoint) + 1));
			//是否躲避
			if(dodgeTurn <= nChar.actualProperties.dodge * 100){
				actualDamage = 0;
				debug && console.log(nChar.name + '躲闪了此次攻击');
			}
			if(actualDamage < 0){
				actualDamage = 1;
			}
			debug && console.log('造成了' + actualDamage + '点伤害');
            nChar.eventManager.trigger(CharEvent.HIT_POINT_DECREASE, {
                hitPoint: actualDamage,

                direction: {x: pChar.cx - nChar.cx, y: pChar.cy - nChar.cy}
            });
			//计算伤害结果
			nChar.hitPointActual -= actualDamage;

			if(nChar.hitPointActual <= 0){
				debug && console.log(nChar.units + nChar.name + '已经死亡');
				//TODO: 触发死亡事件
				nChar.hitPointActual = 0;

				var gains = pChar.exp.getFightExp(pChar.level, nChar.level);

				debug && console.log(pChar.name + '获取了' + gains + '点经验');
				if(pChar.exp.updateExp(gains, pChar.level)){
					pChar.levelUpgrade();
					debug && console.log(pChar.name + '升级了！当前等级：' + pChar.level);
				}
				debug && console.log('-------------');
			}else{
				debug && console.log(nChar.name + '剩余生命值' + nChar.hitPointActual);
			}
			//格挡几率
			var blockTurn = Math.ceil(Math.random() * 100);
			//格挡成功，发动回击
			if(!attackBack && nChar.hitPointActual > 0 && blockTurn <= nChar.actualProperties.block * 100){
                setTimeout(function(){
                    nChar.action.execute(nChar, pChar);
                }, 750);
			}
		}
	};

	oo.extend(Attack, CharAction);

	module.exports = Attack;
});