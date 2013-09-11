define(function(require, exports, module){
	var $c = require('xiaoming/elements');
	var GameBeginView = function(options){
		this._initGameBeginView(options);
	};
	
	GameBeginView.prototype = {
		_initGameBeginView: function(options){
			
		},
		
		_initUI: function(){
			var self = this;
			var usernameDom = $c('input');
			usernameDom.type = 'text';
			usernameDom.placeholder = 'Username';
			var passwordDom = $c('input');
			passwordDom.type = 'password';
			passwordDom.placeholder = 'Password';
			var submitDom = $c('button');
			submitDom.type = 'button';
			submitDom.innerHTML = '提交';
			
			submitDom.onclick = function(){
				self.getEventManager().trigger(GameBeginView.EVENT_SUBMIT, {
					username: usernameDom,
					password: passwordDom
				});
			};

			this.request.divcontainer.appendChild(usernameDom);
			this.request.divcontainer.appendChild(passwordDom);
			this.request.divcontainer.appendChild(submitDom);
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
	
	GameBeginView.EVENT_SUBMIT = 'game_begin_view_submit';
	
	module.exports = GameBeginView;
});