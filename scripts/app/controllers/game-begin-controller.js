define(function(require, exports, module){
	var GameBeginView = require('app/views/game-begin-view');
	var AbstractController = require('xiaoming/abstract-controller');
	var oo = require('xiaoming/oo');
	var resourceLoader = require('xiaoming/resource-loader');
	var $ = require('jquery');
	var GameBeginController = function(options){
		this._initGameBeginController(options);
	};
	
	GameBeginController.prototype = {
		_initGameBeginController: function(options){
			AbstractController.call(this, options);
			
			this.resources = [
				{'name': 'com_res', type: 'image', src: 'resource/images/bg.png'},
				{'name': 'newworld', type: 'image', src: 'resource/images/newworld.png'},
				{'name': 'hit', type: 'image', src: 'resource/images/metatiles32x32.png'},
				{'name': 'map1', type: 'tmx', 'src': 'resource/maps/map1.tmx'},
				{'name': 'solider', type:'image', src: 'resource/images/soldier.png'},
				{'name': 'solider_dark', type:'image', src: 'resource/images/soldier-dark.png'},
				{'name': 'solider_red', type:'image', src: 'resource/images/solider_red.png'},
				{'name': 'solider_red_dark', type:'image', src: 'resource/images/solider_red_dark.png'},
				{'name': 'archer', type:'image', src: 'resource/images/archer.png'},
				{'name': 'archer_dark', type:'image', src: 'resource/images/archer_dark.png'},
				{'name': 'archer_red', type:'image', src: 'resource/images/archer_red.png'},
				{'name': 'archer_red_dark', type:'image', src: 'resource/images/archer_red_dark.png'},
				{'name': 'knight', type:'image', src: 'resource/images/knight.png'},
                {'name': 'pastor', type:'image', src: 'resource/images/priest.png'},
                {'name': 'pastor_dark', type:'image', src: 'resource/images/priest_dark.png'},
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
				{name: 'info_bg', type: 'image', src: 'resource/images/info_bg.png'},
                {name: 'stars', type: 'image', src: 'resource/images/stars.png'},
				{name: 'helper', type: 'image', src: 'resource/images/helper.png'}
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
				$(self.get('view').processbar).animate({
					top: '-=20px',
					opacity: 0
				});
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
