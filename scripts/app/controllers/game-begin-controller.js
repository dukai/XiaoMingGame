define(function(require, exports, module){
	var GameBeginView = require('app/views/game-begin-view');
	var AbstractController = require('xiaoming/abstract-controller');
	var oo = require('xiaoming/oo');
	var resourceLoader = require('xiaoming/resource-loader');
	
	var GameBeginController = function(options){
		this._initGameBeginController(options);
	};
	
	GameBeginController.prototype = {
		_initGameBeginController: function(options){
			AbstractController.call(this, options);
			
			this.resources = [
				{'name': 'newworld', type: 'image', src: 'resource/images/newworld.png'},
				{'name': 'hit', type: 'image', src: 'resource/images/metatiles32x32.png'},
				{'name': 'map1', type: 'tmx', 'src': 'resource/maps/map1.tmx'},
				{'name': 'solider', type:'image', src: 'resource/images/soldier.png'},
				{'name': 'solider_red', type:'image', src: 'resource/images/solider_red.png'},
				{'name': 'archer', type:'image', src: 'resource/images/archer.png'},
				{'name': 'knight', type:'image', src: 'resource/images/knight.png'},
				{'name': 'lotus', type:'image', src: 'resource/images/lotus.png'},
				{name: 'round_btn', type: 'image', src: 'resource/images/round_btn.png'},
				{name: 'btn_bg', type: 'image', src: 'resource/images/btn_bg.png'},
				{name: 'forest', type: 'image', src: 'resource/images/forest.png'},
				{name: 'test', type: 'tmx', src: 'resource/maps/test.tmx'},
				{name: 'new', type:'image', src: 'resource/images/new.png'},
				{name: 'newmap', type: 'tmx', src: 'resource/maps/new.tmx'},
				{name: 'demo_map', type: 'json', src: 'resource/maps/demo_map.json'},
				{name: 'v2_map', type: 'json', src: 'resource/maps/v2.json'},
				{name: 'v2', type: 'image', src: 'resource/images/v2.png'},
				{name: 'info_bg', type: 'image', src: 'resource/images/info_bg.png'}
			];
		},
		
		initEvents: function(){
			
			this.get('eventManager').addEventListener(GameBeginView.EVENT_SUBMIT, this.onSubmitClick, this);
			
		},
		

		login: function(){
			
		},
		
		onSubmitClick: function(event){
			console.log(event);
			var self = this;
			var intent = {
				request: self.get('request'),
				controllerManager: self.get('controllerManager'),
				controllerName: 'GameMainController',
				eventManager: self.get('eventManager'),
				router: self.get('router')
			};
			
			this.forward(intent);
		},
		
		onRender: function(event){
			var self = this;
			resourceLoader.onComplete = function(){
				//alert('complete');
				self.get('view').submit.style.display = 'block';
			};
			resourceLoader.onProgress = function(event){
				var percentage = parseInt((event.loadedCount / event.totalCount) * 100) + '%';
				self.get('view').bar.style.width = percentage;
			};
			
			resourceLoader.load(this.resources);
		}
		
	};
	oo.extend(GameBeginController, AbstractController);
	module.exports = GameBeginController;
});
