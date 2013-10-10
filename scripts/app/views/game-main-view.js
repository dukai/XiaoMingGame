define(function(require, exports, module){
	var $c = require('xiaoming/elements');
	var oo = require('xiaoming/oo');
	var Kinetic = require('kinetic');
	var AbstractView = require('xiaoming/abstract-view');
	var resourceLoader = require('xiaoming/resource-loader');
	
	var TiledMap = require('app/components/tiled-map');
    var RangeGrid = require('app/components/range-grid');


	var GameMainView = function(options){
		this._initGameMainView(options);
	};
	
	GameMainView.prototype = {
		_initGameMainView: function(options){
			AbstractView.call(this, options);
		},
		
		initUI: function(){
			var self = this;
			var stage = this.stage = new Kinetic.Stage({
			    container: this.container,
				width: 960,
				height: 640
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

            this.moveRange = new RangeGrid({
                x: 0,
                y: 0,
                width:100,
                height:100,
                rangeList: [],
                fill: RangeGrid.colorType.green
            });
			this.layer.add(map);
            this.layer.add(this.moveRange);
			stage.add(this.layer);
			var btnAtk = $c('div', null, 'atk');
			btnAtk.innerHTML = '攻击';
			this.container.appendChild(btnAtk);
			$(btnAtk).click(function(){
				self.getEventManager().trigger(GameMainView.EVENT_ATK_CLICK, {
				});
			});

			this._initEvents();
		},

		_initEvents: function(){
			var self = this;
			this.layer.on('click', function(e){
				var offsetX = this.getX();
				var offsetY = this.getY();
				var mpos = {x: e.layerX, y: e.layerY};
				self.getEventManager().trigger(GameMainView.EVENT_LAYER_CLICK, {
                    coordinate : self.getCoordinate(mpos.x, mpos.y, offsetX, offsetY)
                });
			});
		},

		getCoordinate: function(x, y, offsetX, offsetY){
			var posInLayer = {
				x: x - offsetX,
				y: y - offsetY
			}
			var coordinate = {
				x: ~~(posInLayer.x / 32),
				y: ~~(posInLayer.y / 32)
			};

			return coordinate;
		},

        showMoveRange: function(rangeList){
            this.moveRange.setRangeList(rangeList);
        },
        hideMoveRange: function(){
            this.moveRange.setRangeList([]);
        },

		onShowMoveRange: function(event){
			this.showMoveRange(event.rangeList);
		},

		onHideMoveRange: function(event){
			this.hideMoveRange();
		}
	};
	
	GameMainView.EVENT_SUBMIT = 'game-main-view-submit';
	GameMainView.EVENT_LAYER_CLICK = 'game-main-view-layer-click';
	GameMainView.EVENT_ATK_CLICK = 'game-main-view-atk-click';
	oo.extend(GameMainView, AbstractView);
	
	module.exports = GameMainView;
});