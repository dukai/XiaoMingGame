define(function(require, exports, module){
	var util = {};
	var document = window.document;
	var random = function(min, max){
		return (~~(Math.random() * (max - min + 1)) + min);
	};
	util.random = random;
	
	var randomColor = function(){
		var red = this.random(0, 255);
		var green = this.random(0, 255);
		var blue = this.random(0, 255);
		return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
	};
	util.randomColor = randomColor;
		
	var g = function(){
		return document.getElementById(arguments[0]);
	};
	util.g = g;
		
	var getScroll = function() {
		var scrollx, scrolly;
		if (typeof(win.pageXOffset) == 'number') {
			scrollx = win.pageXOffset;
			scrolly = win.pageYOffset;
		} else {
			scrollx = document.documentElement.scrollLeft;
			scrolly = document.documentElement.scrollTop;
		}
		return {
			left: scrollx,
			top: scrolly
		};
	};
	util.getScroll = getScroll;
		
	var getPosInDoc = function(target) {
		if (!target) {
			return null;
		}
		var left = 0,
			top = 0;
			
		do {
			left += target.offsetLeft || 0;
			top += target.offsetTop || 0;
			target = target.offsetParent;
		} while (target);
		
		return {
			left: left,
			top: top
		};
	};
	util.getPosInDoc = getPosInDoc;

	var loadXMLDoc = function(docName){
		try{ //Internet Explorer
			xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		}
		catch(e){
			try{ //Firefox, Mozilla, Opera, etc.
				xmlDoc=document.implementation.createDocument("","",null);
			}catch(e) {
				console.log(e.message);
			}
		}

		try{
			xmlDoc.async=false;
			xmlDoc.load(docName);
			return(xmlDoc);
		}catch(e) {
			console.log(e.message);
		}

		return(null);
	};
	util.loadXMLDoc = loadXMLDoc;

	var parseXMLString = function(text){
		var xmlDoc = null;
		try{ //Internet Explorer
			xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async="false";
			xmlDoc.loadXML(text);

		}catch(e){
			try{ //Firefox, Mozilla, Opera, etc.
		
				parser=new DOMParser();
				xmlDoc=parser.parseFromString(text,"text/xml");
			}
			catch(e) {
				console.log(e.message);
			}
		}

		return xmlDoc;
	};
	util.parseXMLString = parseXMLString;

	var getTextWidth = function(text, styles, context){
		for(var attr in styles){
			context[attr] = styles[attr];
		}

		return context.measureText(text).width;
	};
	util.getTextWidth = getTextWidth;

	var Base64 = {
		decode: function(input){
			if(win.atob){
				return win.atob(input);
			}else{
				var output = [], chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;

				while (i < input.length) {
					enc1 = _keyStr.indexOf(input.charAt(i++));
					enc2 = _keyStr.indexOf(input.charAt(i++));
					enc3 = _keyStr.indexOf(input.charAt(i++));
					enc4 = _keyStr.indexOf(input.charAt(i++));

					chr1 = (enc1 << 2) | (enc2 >> 4);
					chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
					chr3 = ((enc3 & 3) << 6) | enc4;

					output.push(String.fromCharCode(chr1));

					if (enc3 != 64) {
						output.push(String.fromCharCode(chr2));
					}
					if (enc4 != 64) {
						output.push(String.fromCharCode(chr3));
					}
				}

				output = output.join('');
				return output;
			}
		},

		decodeAsArray: function(input, bytes){
			bytes = bytes || 1;

			var dec = this.decode(input), ar = [], i, j, len;

			for (i = 0, len = dec.length / bytes; i < len; i++) {
				ar[i] = 0;
				for (j = bytes - 1; j >= 0; --j) {
					ar[i] += dec.charCodeAt((i * bytes) + j) << (j << 3);
				}
			}
			return ar;
		}
	};

	util.Base64 = Base64;
	/**
	 * A xml dom node parser
	 * @param {XMLDOM}node
	 * @return {Object} parser object
	 * @constructor
	 */
	util.DOMParser = function(node){
		return {
			attr: function(attrName){
				return node.getAttribute(attrName);
			},

			intAttr: function(attrName){
				return parseInt(this.attr(attrName));
			},

            floatAttr: function(attrName){
                return parseFloat(this.attr(attrName));
            },

            getElementsByTagName: function(tagName){
                return node.getElementsByTagName(tagName);
            },

            getFirstElement: function(){
                return node.firstElementChild;
            }
		};
	};
	/**
	 * A canvas and context creator 
	 * @param {int} width
	 * @param {int} height
	 * @return {object} {canvas: canvas, context: context}
	 */
	var createCanvas = function(width, height){
		var canvas = document.createElement("canvas");
		width !== undefined ? canvas.setAttribute('width', width) : null;
		height !== undefined ? canvas.setAttribute('height', height) : null;
		var context = canvas.getContext('2d');
		
		return {canvas: canvas, context: context};
	};
	util.createCanvas = createCanvas;
	
	var rand = function(m, n) {
		return Math.floor((n - m + 1) * Math.random() + m);
	};
	
	util.rand = rand;
	
	var getRandFamilyName = function(){
		var str = '赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐费廉岑薛雷贺倪汤滕殷罗毕郝邬安常乐于时傅皮卞齐康伍余元卜顾孟平黄和穆萧尹姚邵湛汪祁毛禹狄米贝明臧计伏成戴谈宋茅庞熊纪舒屈项祝董梁杜阮蓝闵席季麻强贾路娄危江童颜郭梅盛林刁锺徐邱骆高夏蔡田樊胡凌霍虞万支柯昝管卢莫经房裘缪干解应宗丁宣贲邓';
		var i = rand(0, str.length - 1);
		return str[i];
	};
	
	var getRandFirstName = function(gender){
		var fmStr = '霞|婷|雪|薇|佳|可|芳|芬|月|慧|俊|盈|莹莹|雪|琳|晗|涵|琴|晴|丽|美|瑶|梦|茜|倩|希|夕|梅|月|悦|乐|彤|珍|依|沫|玉|灵|诚美|恩熙|恩惠|银淑|海淑|文姬|研书|信爱|美研|恩英|仁英|仁美|素研|善熙|善姬|美爱|恩京|银姬|慧娜|锡贤|彩媛|秀贤|贞媛|珍熙|恩圣|美娜|智研|敏姬|美珠|秀珠|珍珠|善珠|恩淑|诗妍|惠贞';
		var mStr = '嘉赐|嘉德|嘉福|嘉良|嘉茂|嘉木|嘉慕|嘉纳|嘉年|嘉平|嘉庆|嘉荣|嘉容|嘉瑞|嘉胜|嘉石|嘉实|嘉树|嘉澍|嘉熙|嘉禧|嘉祥|嘉歆|嘉许|嘉勋|嘉言|嘉谊|嘉懿|嘉颖|嘉佑|嘉玉|嘉誉|嘉悦|嘉运|嘉泽|嘉珍|嘉祯|嘉志|嘉致|坚白|坚壁|坚秉|坚成|坚诚|建安|建白|建柏|建本|建弼|建德|建华|建明|建茗|建木|建树|建同|建修|建业|建义|建元|建章|建中|健柏|金鑫|锦程|瑾瑜|晋鹏|经赋|经亘|经国|经略|经纶|经纬|经武|经业|经义|经艺|景澄|景福|景焕|景辉|景辉|景龙|景明|景山|景胜|景铄|景天|景同|景曜|靖琪|君昊|君浩|俊艾|俊拔|俊弼|俊才|俊材|俊驰|俊楚|俊达|俊德|俊发|俊风|俊豪|俊健|俊杰|俊捷|俊郎|俊力|俊良|俊迈|俊茂|俊美|俊民|俊名|俊明|俊楠|俊能|俊人|俊爽|俊悟|俊晤|俊侠|俊贤|俊雄|俊雅|俊彦|俊逸|俊英|俊友|俊语|俊誉|俊远|俊哲|俊喆|俊智|峻熙|季萌|季同|K|开畅|开诚|开宇|开济|开霁|开朗|凯安|凯唱|凯定|凯风|凯复|凯歌|凯捷|凯凯|凯康|凯乐|凯旋|凯泽|恺歌|恺乐|康安|康伯|康成|康德|康复|康健|康乐|康宁|康平|康胜|康盛|康时|康适|康顺|康泰|康裕|L|乐安|乐邦|乐成|乐池|乐和|乐家|乐康|乐人|乐容|乐山|乐生|乐圣|乐水|乐天|乐童|乐贤|乐心|乐欣|乐逸|乐意|乐音|乐咏|乐游|乐语|乐悦|乐湛|乐章|乐正|乐志|黎昕|黎明|力夫|力强|力勤|力行|力学|力言|立诚|立果|立人|立辉|立轩|立群|良奥|良弼|良才|良材|良策|良畴|良工|良翰|良吉|良骥|良俊|良骏|良朋|良平|良哲|理群|理全|茂才|茂材|茂德|茂典|茂实|茂学|茂勋|茂彦|敏博|敏才|敏达|敏叡|敏学|敏智|明诚|明达|明德|明辉|明杰|明俊|明朗|明亮|明旭|明煦|明轩|明远|明哲|明喆|明知|明志|明智|明珠|正|永|辉|波|涛|超|强|文|军|明|周|贵|友|鹏|在宇|在凡|在中|在勇|勇俊|仁俊|仁赫|在孝|银赫|哲秀|政焕|英生|政民|俊秀|政赫|俊奎|万奎|奎泰|昌修|昌民|贤俊|秉国|俊浩|承佑|哲永|胜贤|正泰|勇健|宇哲|基书|庆民|灿宇|东旭|东奎|成泽';
		var uStr;
		if(gender){
			uStr = mStr;
		}else{
			uStr = fmStr;
		}
		
		var array = uStr.split('|');
		return array[rand(0, array.length - 1)];
	};
	
	var getName = function(gender){
		var familyName = getRandFamilyName();
		var firstName = getRandFirstName(gender);
		return familyName + firstName;
	};
	util.getName = getName;
	
	var addGetter = function(construct, attr){
		var method = 'get' + attr[0].toUpperCase() + attr.slice(1);
		construct.prototype[method] = function(){
			return this.attrs[attr];
		};
	};
	util.addGetter = addGetter;
	
	var addSetter = function(construct, attr){
		var method = 'set' + attr[0].toUpperCase() + attr.slice(1);
		construct.prototype[method] = function(value){
			return this.attrs[attr] = value;
		};
	};
	util.addSetter = addSetter;
	
	var addGetterSetter = function(construct, attr){
		addSetter(construct, attr);
		addGetter(construct, attr);
	};
	
	util.addGetterSetter = addGetterSetter;
	var win = window;
	util.JSON = window.JSON;
	
	var dash2Camel = function(value){
		return value.replace(/(-|^)([a-z])/g, function(g){
			console.log(arguments);
			return arguments[2].toUpperCase();
		});
	};

	var camel2Dash = function(value){
		return value.replace(/([^^])([A-Z])/g, '$1-$2').toLowerCase();
	};
	
	util.dash2Camel = dash2Camel;
	util.camel2Dash = camel2Dash;
    /**
     * 根据坐标返回坐标哈希码
     * @param x
     * @param y
     * @returns {string}
     */
	util.pos2HashCode = function(x, y){
		return '{x:' + x + ',y:' + y + '}';
	};
    /**
     * 根据坐标哈希码返回坐标对象
     * @param hashCode
     * @returns {{x: *, y: *}}
     */
    util.hashCode2Pos = function(hashCode){
        var match = /{x:(\d+),y:(\d+)}/.exec(hashCode);
        return {
            x: match[1],
            y: match[2]
        }
    };


    util.indexOf = function(array, piece){
        if(array.indexOf){
            return array.indexOf(piece);
        }
        for(var i = 0, len = array.length; i < len; i++){
            if(array[i] === piece){
                return i;
            }
        }

        return -1;
    };

	module.exports = util;
});