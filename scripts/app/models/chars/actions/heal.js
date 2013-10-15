define(function(require, exports, module){
	var oo = require('xiaoming/oo');
	var CharAction = require('app/models/chars/actions/char-action');

	var Heal = function(options){
		this._initHeal(options);
	};

	Heal.prototype = {
		_initHeal: function(options){
			this.options = oo.mix({}, this.options);
			CharAction.call(this, options);
		},

		execute: function(pChar, nChar){
			var debug = true;
			if(nChar.hitPointActual === 0){
				debug && console.log("人已往矣，无力回天，徒呼奈何，节哀顺变！");
				return;
			}
			debug && console.log(pChar.name + '对' + nChar.name + '开始了治疗：');
			var healPercent = 1;
			var criticalStrikeTurn = Math.ceil(Math.random() * 100);
			//是否暴击
			if(criticalStrikeTurn <= pChar.actualProperties.criticalStrike * 100){
				healPercent = pChar.actualProperties.criticalStrikeDamage;
			}

			var actualHeal = (pChar.actualProperties.healPower * healPercent);
			nChar.hitPointActual += actualHeal;
			if(nChar.hitPointActual >= nChar.actualProperties.hitPoint){
				debug && console.log('血量满');
				nChar.hitPointActual = nChar.actualProperties.hitPoint;
			}else{
				debug && console.log(pChar.name + '为' + nChar.name + '治疗了' + actualHeal + '点生命');
			}
			debug && console.log(nChar.units + nChar.name + '当前生命为' + nChar.hitPointActual);
		}
	};

	oo.extend(Heal, CharAction);

	module.exports = Heal;

});