var Status = function(){
	this._initStatus();
};

Status.prototype = {
	_initStatus: function(){},
	enter: function(target){},
	execute: function(target){},
	exit: function(target){}
};


var StatusNormal = function(){
	this._initStatusNormal();
};
StatusNormal.prototype = {
	_initStatusNormal: function(){},
	enter: function(target){},
	execute: function(target){},
	exit: function(target){}
};

oo.extends(StatusNormal, Status);