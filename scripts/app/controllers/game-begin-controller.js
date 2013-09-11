define(function(require, exports, module){
	var GameBeginController = function(options){
		this._initGameBeginController(options);
	};
	
	GameBeginController.prototype = {
		_initGameBeginController: function(options){
			
		},
		
		run: function(){
			this.view.render();
		},
		
		setView: function(view){
			this.view = view;
		},
		
		setRequest: function(request){
			this.request = request;
		},

		login: function(){

		}
	};

	module.exports = GameBeginController;
});
