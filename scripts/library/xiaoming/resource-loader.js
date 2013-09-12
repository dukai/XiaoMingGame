define(function(require, exports, module){
	var util = require('xiaoming/util');
	//资源载入器
	var resourceLoader = {
		totalCount: 0,
		loadedCount: 0,
		resources: {},
		get: function(name){
			if(this.resources[name] !== undefined){
				return this.resources[name];
			}else{
				console.log('Error on get resource: ' + name);
				return false;
			}
		},
		load: function(resources){
			this.totalCount = resources.length;
			var self = this;
			for(var i = 0, len = resources.length; i < len; i++){
				switch(resources[i].type){
					case 'image':{
						this.loadImage(resources[i]);
						break;
					}
	
					case 'tmx':{
						this.loadXML(resources[i]);
						break;
					}
	
					case 'audio':{
						break;
					}
					
					case 'json': {
						this.loadJSON(resources[i]);
					}
				}
			};
		},
	
		loadImage: function(resource){
			var self = this;
			var img = new Image();
			img.dataName =resource.name;
			img.onload = function(){
				++self.loadedCount;
				self.onProgress({loadedCount: self.loadedCount, totalCount: self.totalCount});
				self.resources[this.dataName] = this;
				if(self.totalCount === self.loadedCount){
					self.onComplete();
				}
			};
			
			img.onerror = function(){
				console.log('Error on: ' + this.dataName);
			};
			
			img.src = resource.src;
		},
		
		loadXML: function(resource){
			var self = this;
			
			var request = new util.Request({
				url: resource.src,
				dataType: 'xml',
				success: function(rep, statusText, xhr){
					++self.loadedCount;
					self.resources[this.dataName] = rep;
					self.onProgress({loadedCount: self.loadedCount, totalCount: self.totalCount});
	
					if(self.totalCount === self.loadedCount){
						self.onComplete();
					}
				},
				error: function(statusText){
					console.log('Error on: ' + statusText);
				}
			});
			request.dataName = resource.name;
	
	
			request.send();
		},
		
		loadJSON: function(resource){
			var self = this;
			var request = new util.Request({
				url: resource.src,
				dataType: 'json',
				success: function(rep, statusText, xhr){
					++self.loadedCount;
					self.resources[this.dataName] = rep;
					self.onProgress({loadedCount: self.loadedCount, totalCount: self.totalCount});
	
					if(self.totalCount === self.loadedCount){
						self.onComplete();
					}
				},
				error: function(statusText){
					console.log('Error on: ' + statusText);
				}
			});
			request.dataName = resource.name;
			request.send();
		},
	
		loadAudio: function(){
	
		},
	
		onProgress: function(event){},
		
		onComplete: function(){}
	};
	
	module.exports = resourceLoader;
});