define(function(require, exports, module){
	var $c = require('xiaoming/elements');
	var oo = require('xiaoming/oo');
	var Kinetic = require('kinetic');
	var AbstractView = require('xiaoming/abstract-view');
	var resourceLoader = require('xiaoming/resource-loader');
	
	var TiledMap = require('app/components/tiled-map');
	var GameMainView = function(options){
		this._initGameMainView(options);
	};
	
	GameMainView.prototype = {
		_initGameMainView: function(options){
			AbstractView.call(this, options);
		},
		
		initUI: function(){
			var stage = this.stage = new Kinetic.Stage({
			    container: this.container,
				width: 960,
				height: 640,
			});
			var map = new TiledMap({
				x:0,
				y:0,
				tmx: resourceLoader.get('v2_map'),
				resourceLoade: resourceLoader
			});
			this.layer = new  Kinetic.Layer({
				draggable: true,
				dragBoundFunc: function(pos){
					var y = pos.y < stage.getHeight() - map.getHeight() ? stage.getHeight() - map.getHeight() : pos.y;
					var x = pos.x < stage.getWidth() - map.getWidth() ? stage.getWidth() - map.getWidth() : pos.x;
					if(y > 0){
						y = 0;
					}
					if(x > 0){
						x = 0;
					}
					return {x: x,y: y};
				}
			});
			var image = new Kinetic.Image({
				x: 0,
				y: 0,
				image: resourceLoader.get('forest'),
				width: 512,
				height: 512
		  	});
			//this.layer.add(image);
			
			this.layer.add(map);
			stage.add(this.layer);
		}
	};
	
	GameMainView.EVENT_SUBMIT = 'game-main-view-submit';
	oo.extend(GameMainView, AbstractView);
	
	module.exports = GameMainView;
});