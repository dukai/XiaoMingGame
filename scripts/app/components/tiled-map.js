/**
 * namespace map
 */
define(function(require, exports, module){
	var Kinetic = require('kinetic');
	var util = require('xiaoming/util');
	var resourceLoader = require('xiaoming/resource-loader');
	/**
	 * 图块
	 *@param options [gid, posX, posY, width, height, tileset]
	 */
	var TiledTile = function(options){
		this.options = options;
	};
	TiledTile.prototype = {
		draw: function(context){
			var options = this.options;
			var gid = options.gid;
			var tileset = options.tileset;
			context.drawImage(
				tileset.getImage(), 
				tileset.getSourceX(gid), 
				tileset.getSourceY(gid) , 
				options.width, 
				options.height, 
				options.posX, 
				options.posY, 
				options.width, 
				options.height
			);
		}
	};
	/**
	 * 图块集
	 *@param options [name, firstgid, tileWidth, tileHeight, totalWidth, totalHeight]
	 */
	var TileSet = function(options){
		this.options = options;
		this.columns = ~~(this.options.totalWidth / this.options.tileWidth);
		this.rows = ~~(this.options.totalHeight / this.options.tileHeight);
		
		this.total = this.rows * this.columns;
		this.lastgid = this.options.firstgid + this.total - 1;
	};
	
	TileSet.prototype = {
		/**
		 * 判断gid是否存在于当前的集合中
		 */
		isContain: function(gid){
			return gid >= this.options.firstgid && gid <= this.lastgid;
		}, 
		getImage: function(){
			return resourceLoader.get(this.options.name);
		},
		getSourceX: function(gid){
			return parseInt((gid - this.options.firstgid) % this.columns) * this.options.tileWidth;
		},
		getSourceY: function(gid){
			return parseInt(((gid - this.options.firstgid) / this.columns)) * this.options.tileHeight;
		}
	};
	/**
	 * tileset 管理器
	 */
	var tilesetManager = {
		tilesets : [],
		add: function(tileset){
			this.tilesets.push(tileset);
		},
		remove: function(tileset){
			this.tilesets.splice(this.tilesets.indexOf(tileset), 1);
		},
		get: function(gid){
			var tilesets = this.tilesets;
			for(var i = 0, len = tilesets.length; i < len; i++){
				if(tilesets[i].isContain(gid)){
					return tilesets[i];
				}
			}
		}
	};
	
	/**
	 * 地图中的层
	 *@param options [name, rows, columns, tileWidth, tileHeight, tilesData, visible]
	 */
	var TiledLayer = function(options){
		this.options = options;
		this.width = options.columns * options.tileWidth;
		this.height = options.rows * options.tileHeight;
		console.log(options);
		this.canvas = util.createCanvas(this.width, this.height);
		this.tiledObjects = [];
		
		if(this.options.visible){
			this.initTiles();
		}
	};
	TiledLayer.prototype = {
		initTiles: function(){
			var options = this.options;
			for(var i = 0, len = options.tilesData.length; i < len; i++){
				var x = i % options.columns;
				var y = ~~(i / options.columns);
				var gid = options.tilesData[i];
				if(gid > 0){
					var tileset = tilesetManager.get(gid);
					var posX = x * tileset.options.tileWidth;
					var posY = y * tileset.options.tileHeight;
					var tiledObj = new TiledTile({
						gid: gid, 
						posX: posX, 
						posY: posY, 
						width: tileset.options.tileWidth, 
						height: tileset.options.tileHeight, 
						tileset: tileset
					});
					tiledObj.draw(this.canvas.context);
					this.tiledObjects.push(tiledObj);
				}
			}
		},
		
		setVisible: function(value){
			if(value && this.tiledObjects.length === 0){
				this.initTiles();
			}
			
			this.visible = value;
		}
	};
	/**
	 * Tiled Map Class
     * config = {x, y, tmxMapParser, resourceLoader}
	 */
	var TiledMap = function(config){
		this._initTiledMap(config);
	};

	TiledMap.prototype = {
		_initTiledMap: function(config){
            Kinetic.Shape.call(this, config);
            this.shapeType = 'TiledMap';
			this.tiledLayers = [];
            var parser = config.tmxMapParser;
            for(var i = 0, len = parser.tileSetData.length; i < len; i++){
                tilesetManager.add(new TileSet(parser.tileSetData[i]));
            }
            for(var i = 0, len = parser.layerData.length; i < len; i++){
                this.tiledLayers.push(new TiledLayer(parser.layerData[i]));
            }
		},
		drawFunc: function(context){
			for(var i = 0, len = this.tiledLayers.length; i < len; i++){
				this.tiledLayers[i] && context.drawImage(this.tiledLayers[i].canvas.canvas, this.getX(), this.getY());
			}
		},
		drawHitFunc: function(context) {
            var width = this.getWidth(), 
                height = this.getHeight();

            context.beginPath();
            context.rect(0, 0, width, height);
            context.closePath();
			context.fillStrokeShape(this);
        },
		
		getWidth: function(){
			return this.getTmxMapParser().getWidth();
		},
		getHeight: function(){
            return this.getTmxMapParser().getHeight();
		}
	};

	Kinetic.Util.extend(TiledMap, Kinetic.Shape);
	Kinetic.Factory.addGetterSetter(TiledMap, 'resourceLoader');
    Kinetic.Factory.addGetterSetter(TiledMap, 'tmxMapParser');
	/**
	 * TiledMap object types enum
	 * @type {Enum}
	 */
	TiledMap.OBJ_TYPE = {
		LAYER: 'tilelayer',
		IMAGE_LAYER: 'imagelayer',
		OBJECT_GROUP: 'objectgroup'
	};
	module.exports = TiledMap;
});