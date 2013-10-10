define(function(require, exports, module){
    var oo = require('xiaoming/oo');

	var TmxMapParser = function(options){
		this._initTmxMapParser(options);
	};

    TmxMapParser.prototype = {
        _initTmxMapParser: function(options){
            this.options = oo.mix({
                mapData: null
            }, options);
            this.layerData = [];
            this.tileSetData = [];
            var mapData = this.options.mapData;

            this.mapInfo = {
                columns: mapData.width,
                rows: mapData.height,
                tileWidth: mapData.tilewidth,
                tileHeight: mapData.tileheight,
                width: mapData.width * mapData.tilewidth,
                height: mapData.height * mapData.tileheight
            };

            this.parseAllTileSet();
            this.parseAllLayers();
        },
        /**
         * 解析所有图块集，层，图片层，对象层
         */
        parseAllLayers: function(){
            var mapDom = this.options.mapData;
            for(var i = 0, len = mapDom.layers.length; i < len; i++){
                var layer = mapDom.layers[i];
                switch(layer.type.toLowerCase()){

                    case LAYTER_TYPE.LAYER: {
                        this.processTiledLayer(layer);
                        break;
                    }

                    case LAYTER_TYPE.IMAGE_LAYER: {
                        //TODO: add image layer
                        break;
                    }

                    case LAYTER_TYPE.OBJ_GROUP: {
                        //TODO: add object group
                        break;
                    }
                }
            }

        },

        parseAllTileSet: function(){
            var mapDom = this.options.mapData;
            for(var i = 0, len = mapDom.tilesets.length; i < len; i++){
                var tileSet = mapDom.tilesets[i];
                this.tileSetData.push(this.getTileSet(tileSet));
            }
        },

        /**
         * 获取TileSet信息
         */
        getTileSet: function(tileset){

            return {
                name: tileset.name,
                firstgid: tileset.firstgid,
                tileWidth: tileset.tilewidth,
                tileHeight: tileset.tileheight,
                totalWidth: tileset.imagewidth,
                totalHeight: tileset.imageheight
            };
        },
        //处理地图层
        processTiledLayer: function(layer){
            if(layer.properties && layer.properties.layer_type && layer.properties.layer_type == 'hitmap'){
                this.setHitMap(layer.data);
                return;
            }
            this.layerData.push({
                name: layer.name,
                rows: layer.height,
                columns: layer.width,
                tileWidth: this.mapInfo.tileWidth,
                tileHeight: this.mapInfo.tileHeight,
                tilesData: layer.data,
                visible: layer.visible
            });
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
        /**
         * 获取碰撞地图
         * @returns {*}
         */
        getHitMap: function(){
            return this.hitMap;
        },

        getColumns: function(){
            return this.mapInfo.columns;
        },

        getRows: function(){
            return this.mapInfo.rows;
        },

        getWidth: function(){
            return this.mapInfo.width;
        },

        getHeight: function(){
            return this.mapInfo.height;
        }
    };
    /**
     * TiledMap object types enum
     */
    var LAYTER_TYPE = {
        LAYER: 'tilelayer',
        IMAGE_LAYER: 'imagelayer',
        OBJ_GROUP: 'objectgroup'
    };

    module.exports = TmxMapParser;
});