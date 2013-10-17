define(function(require, exports, module){
    var oo = require('xiaoming/oo');
    var Kinetic = require('kinetic');
    var resourceLoader = require('xiaoming/resource-loader');
    var DialogFix = function(options){
        this._initDialogFix(options);
    };

    DialogFix.prototype = {
        _initDialogFix: function(options){
            this.options = oo.mix({
                messages: []
            }, options);

            Kinetic.Group.call(this, options);
            this.setName('dialog_fix');


            this.bg = new Kinetic.Rect({
                width:960,
                height:160,
                fill: 'rgba(0,0,0,.5)',
                x:0,
                y:640-160
            });
            var self = this;

            var avatarImg = resourceLoader.get('helper');
            this.avatar = new Kinetic.Image({
                image: avatarImg,
                x:0,
                y: 640 - avatarImg.height
            });
            var firstMessage = this.options.messages.shift().content;
            this.text = new Kinetic.Text({
                x: avatarImg.width,
                y: 640-130,
                text : firstMessage,
                fontSize: 18,
                fontFamily: "Microsoft YaHei",
                fill: '#fff',
                align : 'left',
                listening : false,
                lineHeight: 1.5
            });

            this.skip = new Kinetic.Text({
                x: 960-70,
                y: 640-30,
                text : '跳过>>',
                fontSize: 18,
                fontFamily: "Microsoft YaHei",
                fill: '#fff',
                align : 'left',
                lineHeight: 1.5
            });

            this.add(new Kinetic.Rect({
                x:0,
                y:0,
                width:960,
                height:640,
                fill: 'rgba(0,0,0,.2)'
            }));
            this.add(this.bg);
            this.add(this.avatar);
            this.add(this.skip);
            this.add(this.text);

            this.initEvents();
        },

        initEvents: function(){
            var self = this;

            this.bg.on('click', function(){
                if(self.options.messages.length == 0){
                    self.hide();
                    self.getLayer().draw();
                    return;
                }
                var message = self.options.messages.shift();
                self.text.setText(message.content);
                self.text.getLayer().draw();
            });

            this.skip.on('click', function(){
                self.hide();
                self.getLayer().draw();
            });
        }
    };

    Kinetic.Util.extend(DialogFix, Kinetic.Group);


    module.exports = DialogFix;
});