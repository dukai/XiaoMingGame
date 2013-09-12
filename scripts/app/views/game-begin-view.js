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
			
			var progressbar = $c('div', null, 'progressbar');
			var bar = this.bar = $c('div', null, 'bar');
			progressbar.appendChild(bar);
			
			var submitDom = this.submit = $c('button');
			submitDom.type = 'button';
			submitDom.className = 'btn_start';
			submitDom.innerHTML = '开始游戏';
			submitDom.style.display = "none";
			submitDom.onclick = function(){
				self.getEventManager().trigger(GameBeginView.EVENT_SUBMIT, {
				});
			};
			container.appendChild(progressbar);
			container.appendChild(submitDom);
		}
		
	};
	
	GameBeginView.EVENT_SUBMIT = 'game-begin-view-submit';
	GameBeginView.EVENT_RENDER = 'game-begin-view-render';
	oo.extend(GameBeginView, AbstractView);
	
	module.exports = GameBeginView;
});