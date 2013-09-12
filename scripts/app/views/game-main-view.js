define(function(require, exports, module){
	var $c = require('xiaoming/elements');
	var GameMainView = function(options){
		this._initGameBeginView(options);
	};
	
	GameMainView.prototype = {
		_initGameBeginView: function(options){
			
		},
		
		_initUI: function(){
			var container = this.container = $c('div', null, 'sence');
			container.appendChild($c('input'));
			this.request.container.appendChild(container);
		},
		
		render: function(){
			this._initUI();
		},
		
		setRequest: function(request){
			this.request = request;
		},
		
		setEventManager: function(eventManager){
			this._eventManager = eventManager;
		},
		
		getEventManager: function(){
			return this._eventManager;
		}
	};
	
	GameMainView.EVENT_SUBMIT = 'game_main_view_submit';
	
	module.exports = GameMainView;
});