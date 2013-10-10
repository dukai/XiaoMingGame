define(function(require, exports, module){
	var $c = require('xiaoming/elements');
	var $ = require('jquery');
	var util = require('xiaoming/util');
	var oo = require('xiaoming/oo');
	
	var AbstractView = function(options){
		this._initAbstractView(options);
	};
	
	AbstractView.prototype = {
		_initAbstractView: function(options){
            this.options = oo.mix({}, this.options);
            this.options = oo.mix(this.options, options);
			this.container = $c('div', null, 'sence');
			this._viewName = null;
			this.initUI();
		},
		
		initUI: function(){
			
		},
		
		render: function(){
			$(this.container).addClass(this.get('viewName')).css('display', 'none');
			this.request.container.appendChild(this.container);
			$(this.container).fadeIn();
			
			this.getEventManager().trigger(this.getRenderEventName(), {});
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
		
		destroy: function(){
			//this.container.style.display = 'none';
			$(this.container).fadeOut();
		},
		getRenderEventName: function(){
			return util.camel2Dash(this._viewName).replace('-view', '-render');
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
