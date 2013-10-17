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
                messages: [
                    {
                        content: '大叔你好，我是你大爷！\n快来玩吧小伙伴！'
                    },
                    {
                        content: '大爷啊，大爷！就是大爷！\n快来玩吧小伙伴！'
                    }
                ]
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
            this.bg.on('click', function(){
                if(self.options.messages.length == 0){
                    self.hide();
                    this.getLayer().draw();
                    return;
                }
                var message = self.options.messages.shift();
                self.text.setText(message.content);
                self.text.getLayer().draw();
            });
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

            this.skip.on('click', function(){
                this.hide();
                this.getLayer().draw();
            });
            this.add(this.bg);
            this.add(this.avatar);
            this.add(this.skip);
            this.add(this.text);
        }
    };

    Kinetic.Util.extend(DialogFix, Kinetic.Group);


    module.exports = DialogFix;
});