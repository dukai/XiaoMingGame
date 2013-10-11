define(function(require, exports, module){
	var oo = require('xiaoming/oo');
	var Kinetic = require('kinetic');

	var PopMenu = function(options){
		this._initPopMenu(options);
	};

	PopMenu.prototype = {
		_initPopMenu: function(options){
			this.options = oo.mix({
				itemsList: [{
					text: '取消',
					callback: function(){
						console.log('pop menu clicked cancel');
					}
				}]
			}, this.options);
			this.options = oo.mix(this.options, options);
			Kinetic.Group.call(this, this.options);
			this.setName('popmenugroup');
			this.initItems();
		},

		initItems: function(){
			var self = this;
			var list = this.getItemsList();
			for(var i = 0, len = list.length; i < len; i++){
				var n = list[i];
				var menuBg = new Kinetic.Rect({
					x: 0,
					y: i * 33,
					width: 106,
					height:32,
					fill:'#990000'
				});

				menuBg.menuIndex = i;
				menuBg.on('click', function(e){
					e.cancelBubble = true;
					self.getItemsList()[this.menuIndex].callback && self.getItemsList()[this.menuIndex].callback();
				});

				menuBg.on('mousedown', function(e){
					this.setFill('#660000');
				})
				menuBg.on('mouseup', function(e){
					this.setFill('#990000');
				})

				menuBg.on('mouseout', function(e){
					this.setFill('#990000');
				})

				var word = new Kinetic.Text({
					x: 0,
					y: i* 33 + 7,
					text : n.text,
					fontSize: 18,
					fontFamily: "Microsoft YaHei",
					fill: '#fff',
					height:32,
					width:106,
					align : 'center',
					listening : false
				});

				this.add(menuBg);
				this.add(word);
			}
		}
	};

	Kinetic.Util.extend(PopMenu, Kinetic.Group);
	Kinetic.Factory.addGetterSetter(PopMenu, 'itemsList');

	module.exports = PopMenu;
});