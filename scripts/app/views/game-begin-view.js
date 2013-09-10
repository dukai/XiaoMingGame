define(function(require, exports, module){
	var GameBeginView = function(options){
		this._initGameBeginView(options);
	};
	
	GameBeginView.prototype = {
		_initGameBeginView: function(options){
			
		},
		
		_initUI: function(){
			this.request.divcontainer.appendChild(document.createElement('input'));
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