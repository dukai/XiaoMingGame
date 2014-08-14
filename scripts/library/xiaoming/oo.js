define(function(require, exports, module){
	/**
	 * extend method for js class
	 * @param subClass
	 * @param baseClass
	 */
	var extend = function(subClass, baseClass){
		var parent = subClass.parent = {
			/**
			 * parent construct
			 * @param obj currentObject
			 * @param args
			 */
			'__construct': function(obj, args){
				baseClass.apply(obj, args);
			}
		};

		for(var method in baseClass.prototype){
			if(! (method in subClass.prototype)){
				subClass.prototype[method] = parent[method] = baseClass.prototype[method];
			}
			
		}
	};

	exports.extend = extend;
	
	var isPlainObject = function(obj){
		if(!obj.hasOwnProperty('constructor') && typeof obj == 'object' && obj.constructor == Object){
			return true;
		}
		
		return false;
	}

	/**
	 * mix js object 
	 * @param {Object} base
	 * @param {Object} child
	 */
	var mix = function(base, child, deep){
		var o = new Object();
		for(var key in base){
			o[key] = base[key];
		}
		for(var key in child){
			if(deep && isPlainObject(o[key])){
				o[key] = mix(o[key], child[key]);
			}else{
				o[key] = child[key];
			}
		}
		return o;
	};

	exports.mix = mix;
});

