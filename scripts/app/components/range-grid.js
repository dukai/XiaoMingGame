/**
 * member move or attack range view
 * @author DK
 * @date 2013/5/7 23:32
 */

define(function(require, exports, module){
    var Kinetic = require('kinetic');

    var RangeGrid = function(options){
        this._initRangeView(options);
    };

    RangeGrid.prototype = {
        _initRangeView: function(options){
            Kinetic.Shape.call(this, options);
            this.shapeType = 'RangeView';
            this.tiledWidth = 32;
            this.tiledHeight = 32;
        },

        drawFunc: function(context){
            var rangeList = this.getRangeList();
            context.beginPath();
            for(var i = 0, len = rangeList.length; i < len; i++){
                //n = {x: x, y: y}
                var n = rangeList[i];

                context.rect(n.x * 32, n.y * 32, this.tiledWidth, this.tiledHeight);
            }
            context.closePath();
            context.fillStrokeShape(this);
        }
    };

    RangeGrid.colorType = {
        red: 'rgba(100, 0, 0, .5)',
        green: 'rgba(0, 100, 0, .5)',
        blue: 'rgba(0, 0, 100, .5)'
    }

    Kinetic.Util.extend(RangeGrid, Kinetic.Shape);
    Kinetic.Factory.addGetterSetter(RangeGrid, 'rangeList');
    Kinetic.Factory.addGetterSetter(RangeGrid, 'colorType');

    module.exports = RangeGrid;
});