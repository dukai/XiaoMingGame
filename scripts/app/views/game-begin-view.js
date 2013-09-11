define(function(require, exports, module){
	var $c = require('xiaoming/elements');
	var GameBeginView = function(options){
		this._initGameBeginView(options);
	};
	
	GameBeginView.prototype = {
		_initGameBeginView: function(options){
			
		},
		
		_initUI: function(){
			var usernameDom = $c('input');
			usernameDom.type = 'text';
			usernameDom.placeholder = 'Username';
			var passwordDom = $c('input');
			passwordDom.type = 'text';
			passwordDom.placeholder = 'Password';
			var submitDom = $c('button');
			submitDom.type = 'button';
			submitDom.innerHTML = '提交';
			
			submitDom.onclick = function(){
				
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
		}
	};
	
	module.exports = GameBeginView;
});