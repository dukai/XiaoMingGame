/**
 * namespace map
 */
define(function(require, exports, module){
	
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
	 */
	var TiledMap = function(config){
		this._initTiledMap(config);
	};

	TiledMap.prototype = {
		_initTiledMap: function(config){
            Kinetic.Shape.call(this, config);
            this.hitMap = [];
            this.shapeType = 'TiledMap';
			this.tiledLayers = [];
			this.mapDom = this.getTmx();
			this.initMapInfo();
            this._setDrawFuncs();
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
		
		/**
		 * 初始化地图信息
		 */
		initMapInfo: function(){
			var mapDom = this.mapDom;
			var info = {};
			info.columns = mapDom.width;
			info.rows = mapDom.height;
			info.tileWidth = mapDom.tilewidth;
			info.tileHeight = mapDom.tileheight;
			info.width = info.columns * info.tileWidth;
			info.height = info.rows * info.tileHeight;
			this.mapInfo = info;
			
			this.parseAllTileSet();
			this.parseAllLayers();
			
		},
		/**
		 * 解析所有图块集，层，图片层，对象层
		 */
		parseAllLayers: function(){
			var mapDom = this.mapDom;
			for(var i = 0, len = mapDom.layers.length; i < len; i++){
				var layer = mapDom.layers[i];
				switch(layer.type.toLowerCase()){

					case TiledMap.OBJ_TYPE.LAYER: {
						this.tiledLayers.push(this.getTiledLayer(layer));
						break;
					}
					
					case TiledMap.OBJ_TYPE.IMAGE_LAYER: {
						//this.tiledLayers.push(this.getImageLayer(node));
						break;
					}

					case TiledMap.OBJ_TYPE.OBJECT_GROUP: {
						//this.tiledLayers.push(this.getObjectGroup(node));
						break;
					}
				}
			}
			
		},
		
		parseAllTileSet: function(){
			var mapDom = this.mapDom;
			for(var i = 0, len = mapDom.tilesets.length; i < len; i++){
				var tileset = mapDom.tilesets[i];
				tilesetManager.add(this.getTileSet(tileset));
			}
		},
		/**
		 * 获取TileSet信息
		 */
		getTileSet: function(tileset){

			return new TileSet({
				name: tileset.name,
				firstgid: tileset.firstgid, 
				tileWidth: tileset.tilewidth, 
				tileHeight: tileset.tileheight, 
				totalWidth: tileset.imagewidth, 
				totalHeight: tileset.imageheight
			});
		},
		getTiledLayer: function(layer){
			if(layer.properties && layer.properties.layer_type && layer.properties.layer_type == 'hitmap'){
				this.setHitMap(layer.data);
				return;
			}
			return new TiledLayer({
				name: layer.name,
				rows: layer.height,
				columns: layer.width,
				tileWidth: this.mapInfo.tileWidth, 
				tileHeight: this.mapInfo.tileHeight,
				tilesData: layer.data,
				visible: layer.visible
			});
		},
		getImageLayer: function(node){},
		getObjectGroup: function(node){},
		
		getWidth: function(){
			return this.mapInfo.width;
		},
		getHeight: function(){
			return this.mapInfo.height;
		},
		/**
		 *获取行数 
		 */
		getRows: function(){
			return this.mapInfo.rows;
		},
		/**
		 *获取列数 
		 */
		getColumns: function(){
			return this.mapInfo.columns;
		},
		/**
		 *设置碰撞地图，将一维数组转换为二维数组
		 * @param {Array} data 一维数组 
		 */
		setHitMap: function(data){
			var mapArray = new Array(this.getRows());
			for(var i = 0, len = data.length; i < len; i++){
				var x = i % this.getColumns();
				var y = ~~(i / this.getColumns());
				
				if(mapArray[y] === undefined){
					mapArray[y] = [];
				}
				var gid = data[i];
				
				if(gid > 0){
					mapArray[y][x] = 1;
				}else{
					mapArray[y][x] = 0;
				}
			}
			
			this.hitMap = mapArray;
		},
		
		getHitMap: function(){
			return this.hitMap;
		}
		
		
	};

	Kinetic.Util.extend(TiledMap, Kinetic.Shape);
	Kinetic.Factory.addGetterSetter(TiledMap, 'tmx');
	Kinetic.Factory.addGetterSetter(TiledMap, 'resourceLoader');
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