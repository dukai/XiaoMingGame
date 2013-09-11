/**
 * User: DK
 * Date: 13-4-17
 * Time: 上午11:39
 */

define(function(require, exports, module){
	var eles = {
		div: document.createElement('div'),
		ul: document.createElement('ul'),
		li: document.createElement('li'),
		span: document.createElement('span'),
		p: document.createElement('p'),
		a: document.createElement('a'),
		fragment: document.createDocumentFragment(),
		input: document.createElement('input')
	}
	/**
	 * create element
	 * @param tagName
	 * @param id
	 * @param className
	 * @returns {null}
	 */
	var $c = function(tagName, id, className){
		var ele = null;
		if(!eles[tagName]){
			eles[tagName] = document.createElement(tagName);
			ele = eles[tagName].cloneNode(true);
		}else{
			ele = eles[tagName].cloneNode(true);
		}
		if(id){
			ele.id = id;
		}
		if(className){
			ele.className = className;
		}
		return ele;
	};

	module.exports = $c;
});