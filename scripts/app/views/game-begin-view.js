define(function(require, exports, module){
	var $c = require('xiaoming/elements');
	var oo = require('xiaoming/oo');
	var AbstractView = require('xiaoming/abstract-view');
	var $ = require('jquery');
	var GameBeginView = function(options){
		this._initGameBeginView(options);
	};
	
	GameBeginView.prototype = {
		_initGameBeginView: function(options){
			AbstractView.call(this, options);
		},
		
		initUI: function(){
			var self = this;
			$(this.container).addClass('game-begin');
			var container = this.container;
			
			var progressbar = this.processbar = $c('div', null, 'progressbar');
			var bar = this.bar = $c('div', null, 'bar');
			progressbar.appendChild(bar);
			
			var submitDom = this.submit = $c('button');
			submitDom.type = 'button';
			submitDom.className = 'btn_start';
			submitDom.innerHTML = '开始游戏';
			submitDom.style.display = "none";
			$(submitDom).click(function(){
				console.log('Submit clicked');
				self.getEventManager().trigger(GameBeginView.EVENT_SUBMIT, {});
			});
			var gamename = $c('h1', 'gamename');
			gamename.innerHTML = '小明的游戏';
			container.appendChild(gamename);
			container.appendChild(progressbar);
			container.appendChild(submitDom);
		}
		
	};
	
	GameBeginView.EVENT_SUBMIT = 'game-begin-view-submit';
	GameBeginView.EVENT_RENDER = 'game-begin-view-render';
	oo.extend(GameBeginView, AbstractView);
	
	module.exports = GameBeginView;
});