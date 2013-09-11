define(function(require, exports, module){
	var EventManager = function(){
		this._initEventManager();
	};
	
	EventManager.prototype = {
		_initEventManager: function(){
			this.events = {};
		},
		add: function(eventName, foo, target){
			this._addEventObject(eventName, foo, target);
		},
		
		
		remove: function(eventName, foo){
			this._removeEventObject(eventName);
		},
		
		trigger: function(eventName, event){
			var events = this.events[eventName];
			if(events){
				for(var i = 0, len = events.length; i < len; i++){
					var e = events[i];
					if(e.target){
						e.foo.call(e.target, event);
					}else{
						e.foo(event);
					}
				}
			}
		},
		
		_addEventObject: function(eventName, foo, target){
			if(this.events[eventName] === undefined){
				this.events[eventName] = [];
				
			}
			
			this.events[eventName].push({
				foo: foo,
				target: target
			});
		},
		
		_removeEventObject: function(eventName){
			delete this.events[eventName];
		}
	};
	
	module.exports = EventManager;
});
