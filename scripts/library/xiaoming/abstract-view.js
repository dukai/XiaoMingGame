define(function(require, exports, module){
	var $c = require('xiaoming/elements');
	var AbstractView = function(options){
		this._initAbstractView(options);
	};
	
	AbstractView.prototype = {
		_initAbstractView: function(options){
			this.container = $c('div', null, 'sence');
			this.initUI();
		},
		
		initUI: function(){
			
		},
		
		render: function(){
			this.request.container.appendChild(container);
		},
		
		setRequest: function(request){
			this.request = request;
		},
		
		setEventManager: function(eventManager){
			this._eventManager = eventManager;
		},
		
		getEventManager: function(){
			return this._eventManager;
		},
		
		distroy: function(){
			this.container.style.display = 'none';
		},
		
		get: function(key){
			if(this['_' + key]){
				return this['_' + key];
			}else{
				return null;
			}
			
		},
		
		set: function(key, value){
			this['_' + key] = value;
		}
		
	};
	
	module.exports = AbstractView;
});
