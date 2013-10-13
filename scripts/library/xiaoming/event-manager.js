define(function(require, exports, module){
    var Util = require('xiaoming/util');

	var EventManager = function(){
		this._initEventManager();
	};
	
	EventManager.prototype = {
		_initEventManager: function(){
			this.events = {};
		},
		addEventListener: function(eventName, foo, target){
			this._addEventObject(eventName, foo, target);
		},
		
		
		removeEventListener: function(eventName, foo){
			this._removeEventObject(eventName, foo);
		},
		
		trigger: function(eventName, event){
			var events = this.events[eventName];
			if(events){
				for(var i = 0, len = events.length; i < len; i++){
					var e = events[i];
					if(e.target){
						e.foo.call(e.target, event);
					}else{
						e.foo.call(this, event);
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
		
		_removeEventObject: function(eventName, foo){
            if(foo){
                for(var i = 0, len = this.events[eventName].length; i < len;){
                    if(this.events[eventName].foo === foo){
                        this.events[eventName].splice(i, 1);
                        len--;
                    }else{
                        i++;
                    }
                }
            }else{
                delete this.events[eventName];
            }

		}
	};
	
	module.exports = EventManager;
});
